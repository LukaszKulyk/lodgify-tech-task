import { TodoistApi } from "@doist/todoist-api-typescript"
import MainPage from "../pages/MainPage";

//env variables:
const email = Cypress.env('email');
const password = Cypress.env('password');
const apiToken = Cypress.env('apiToken');
const viewport = Cypress.env('viewport')


const api = new TodoistApi(apiToken);

//test data:
const newProjectData = {
  name: "Test Project",
  color: "orange",
  viewStyle: "board"
}

describe('Verify create project functionality.', () => {

  let projectId;

  before(() => {
    api.addProject({ name: newProjectData.name, color: newProjectData.color, viewStyle: newProjectData.viewStyle })
      .then(response => {
        expect(response).to.have.property('name', newProjectData.name).to.be.a('string');
        expect(response).to.have.property('id').to.match(/\d+/);
        expect(response).to.have.property('color', newProjectData.color).to.be.a('string');
        expect(response).to.have.property('isShared', false).to.be.a('boolean');
        expect(response).to.have.property('isFavorite', false).to.be.a('boolean');
        expect(response).to.have.property('isInboxProject', false).to.be.a('boolean');
        expect(response).to.have.property('isTeamInbox', false).to.be.a('boolean');
        expect(response).to.have.property('order').to.be.a('number');
        //expect(response).to.have.property('viewStyle', newProjectData.viewStyle).to.be.a('string'); viewStyle parameter does not work - it's a bug.
        expect(response).to.have.property('url', `https://todoist.com/showProject?id=${response.id}`).to.be.a('string');
        expect(response).to.have.property('parentId', null);

        projectId = response.id;
      })
      .catch((error) => console.log(error));

      cy.visit('/auth/login', {
        onBeforeLoad (win) {
          // force Warsaw geolocation
          const latitude = 52.2330335;
          const longitude = 20.8963871;
          cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
            return cb({ coords: { latitude, longitude } });
          });
        },
      });
  });

  it('Verify if new project created from API is properly visible on web application.', () => {

      let createdProjectId = projectId;

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

      mainPage
        .getAppHolder()
        .should('exist')
        .and('be.visible');

      mainPage
        .getContent()
        .should('exist')
        .and('be.visible');

      mainPage
        .getLeftMenu()
        .should('exist')
        .and('be.visible');

      mainPage
        .getFilterInbox()
        .should('exist')
        .and('be.visible');

      mainPage
        .getFilterToday()
        .should('exist')
        .and('be.visible');

      mainPage
        .getFilterUpcoming()
        .should('exist')
        .and('be.visible');

      mainPage
        .getFiltersLabels()
        .should('exist')
        .and('be.visible');

      mainPage
        .getAgendaView()
        .should('exist')
        .and('be.visible');

      mainPage
        .getProjectById(createdProjectId)
        .should('exist')
        .and('be.visible');

      mainPage
        .getProjectById(createdProjectId)
        .should('contain.text', newProjectData.name)

      mainPage
        .getProjectByName(newProjectData.name)
        .should('have.length', 1)

  });

  after(() => {
    api.deleteProject(projectId)
        .then((isSuccess) => console.log(isSuccess))
        .catch((error) => console.log(error))
  });
})