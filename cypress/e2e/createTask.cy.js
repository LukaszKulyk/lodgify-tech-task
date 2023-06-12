import { TodoistApi } from "@doist/todoist-api-typescript"
import MainPage from "../pages/MainPage";

//env variables:
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiToken = Cypress.env('apiToken');


const api = new TodoistApi(apiToken);

//test data:
const newTaskData = {
  name: "New Task",
  description: "This is a small test description for testing purpose.",
  label: "testLabel"
}

const projectName = "Test Task Project";

describe('Verify create new task functionality.', () => {

    let projectId;

    before(() => {

        api.addProject({ name: projectName })
            .then(response => {
                projectId = response.id;
            })
            .catch((error) => console.log(error))

        cy.visit('/auth/login');
        cy.login(email, password);

        const mainPage = new MainPage();

        mainPage
            .getTopBar()
            .should('exist')
            .and('be.visible');

        mainPage
            .getBurgerMenuButton()  
            .should('exist')
            .and('be.visible');

        mainPage
            .getBurgerHomeButton()
            .should('exist')
            .and('be.visible');

        mainPage
            .getSettingsButton()
            .should('exist')
            .and('be.visible');
    });

  it('Verify if new task created from WEB is properly available from API perspective.', () => {

    let createdProjectId = projectId;

    const mainPage = new MainPage();

    mainPage
        .getAddNewTaskButton()
        .click();

    mainPage
        .getTaskEditorForm()
        .should('exist')
        .and('be.visible');
    
    mainPage
        .writeValueInTaskEditorContentField(`${newTaskData.name} @${newTaskData.label} `);

    mainPage
        .writeValueInTaskEditorDescriptionContainer(newTaskData.description);

    mainPage
        .getRemoveDueDate()
        .click();

    mainPage
        .getRemoveDueDate()
        .should('not.exist');

    mainPage
        .getTaskPriorityByValue(4)
        .should('exist')
        .and('be.visible');

    mainPage
        .getSetPriority()
        .click();

    mainPage
        .selectPriorityFromTheListOfPrioritiesByValue(2)
        .click();

    mainPage
        .getTaskPriorityByValue(2)
        .should('exist')
        .and('be.visible');

    mainPage
        .getSelectAProject()
        .click();

    mainPage
        .writeValueInProjectSearch(projectName);

    mainPage
        .getCancelButtonInTaskCreationForm()
        .should('exist')
        .and('be.visible');

    mainPage
        .getCreateNewTaskButtonInTaskCreationForm()
        .click();

    mainPage
        .getProjectById(createdProjectId)
        .click()

    mainPage
        .getProjectDashboardByProjectId(createdProjectId)
        .should('exist')
        .and('be.visible');

    mainPage
        .getListOfProjectItems()
        .should('have.length', 1);

    mainPage
        .getTaskContent()
        .should('have.text', newTaskData.name);

    mainPage
        .getTaskDescription()
        .should('have.text', newTaskData.description);

    mainPage
        .getTaskLabel()
        .should('have.text', newTaskData.label);

    mainPage
        .getListOfProjectItems()
        .invoke('attr', 'data-item-id')
        .then($taskId => {
            mainPage
                .getTaskById($taskId)
                .should('exist')
                .and('be.visible');

            api.getTask($taskId)
                .then(response => {
                    expect(response).to.have.property('id', $taskId).to.match(/\d+/);
                    expect(response).to.have.property('content', newTaskData.name).to.be.a('string');
                    expect(response).to.have.property('description', newTaskData.description).to.be.a('string');
                    expect(response).to.have.property('labels').to.be.an('array').and.to.include(newTaskData.label);
                    expect(response).to.have.property('isCompleted', false).to.be.a('boolean');
                    expect(response).to.have.property('priority', 3).to.be.a('number');
                    expect(response).to.have.property('projectId', createdProjectId).to.be.a('string');
                    expect(response).to.have.property('order').to.be.a('number');
                    expect(response).to.have.property('url', `https://todoist.com/showTask?id=${$taskId}`).to.be.a('string');
                    expect(response).to.have.property('due').to.be.a(null);
                })
                .catch((error) => console.log(error))
    })
  });

  after(() => {
    api.deleteProject(projectId)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))

    cy.logout();
  });
})