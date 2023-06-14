import { TodoistApi } from "@doist/todoist-api-typescript"
import MainPage from "../pages/MainPage";

//env variables:
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiToken = Cypress.env('apiToken');
const viewport = Cypress.env('viewport')


const api = new TodoistApi(apiToken);

//test data:
const newTaskData = {
  name: "New Task",
  description: "This is a small test description for testing purpose.",
  label: "testLabel",
  priority: 2,
}

const newApiTaskData = {
    name: "New Task from API",
    description: "New task created using API call",
    label: 'APIRequestLabel',
    priority: 1,
}

const projectName = "Test Task Project";

describe('Verify create new task functionality.', () => {

    let projectId;

    beforeEach(() => {

        api.addProject({ name: projectName })
            .then(response => {
                projectId = response.id;
            })
            .catch((error) => console.log(error))

        cy.visit('/auth/login', {
            onBeforeLoad (win) {
              //force London geolocation
              const latitude = 51.5287398;
              const longitude = -0.2664058;
              cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
                return cb({ coords: { latitude, longitude } });
              });
            },
          });
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
        .selectPriorityFromTheListOfPrioritiesByValue(newTaskData.priority)
        .click();

    mainPage
        .getTaskPriorityByValue(newTaskData.priority)
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
                        expect(response).to.have.property('priority', newTaskData.priority).to.be.a('number');
                        expect(response).to.have.property('projectId', createdProjectId).to.be.a('string');
                        expect(response).to.have.property('order').to.be.a('number');
                        expect(response).to.have.property('url', `https://todoist.com/showTask?id=${$taskId}`).to.be.a('string');
                        expect(response).to.have.property('due').to.be.a(null);
                    })
                    .catch((error) => console.log(error))
    })
  });

  it('Verify if new task created from API is properly available on WEB page.', () => {

    let createdProjectId = projectId;

    api.addTask({
        content: newApiTaskData.name,
        description: newApiTaskData.description,
        projectId: projectId,
        labels: [newApiTaskData.label],
        priority: newApiTaskData.priority
        })
        .then(response => {
            return new Cypress.Promise((resolve, reject) => {
                expect(response).to.have.property('id', response.id).to.match(/\d+/);
                expect(response).to.have.property('content', newApiTaskData.name).to.be.a('string');
                expect(response).to.have.property('description', newApiTaskData.description).to.be.a('string');
                expect(response).to.have.property('labels').to.be.an('array').and.to.include(newApiTaskData.label);
                expect(response).to.have.property('isCompleted', false).to.be.a('boolean');
                expect(response).to.have.property('priority', newApiTaskData.priority).to.be.a('number');
                expect(response).to.have.property('projectId', projectId).to.be.a('string');
                expect(response).to.have.property('order').to.be.a('number');
                expect(response).to.have.property('url', `https://todoist.com/showTask?id=${response.id}`).to.be.a('string');
                expect(response).to.have.property('due').to.be.a(null);
            })
        })
        .catch((error) => console.log(error));

    const mainPage = new MainPage();

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
        .should('have.text', newApiTaskData.name);
        
    mainPage
        .getTaskDescription()
        .should('have.text', newApiTaskData.description);
        
    mainPage
        .getTaskLabel()
        .should('have.text', newApiTaskData.label);
    

  })

  afterEach(() => {
    api.deleteProject(projectId)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))
  });
})