import { mainPageLocators } from "../support/locators";

class MainPage {

    getTopBar() {
        return cy.get(mainPageLocators.topBarLocator);
    }

    getBurgerMenuButton() {
        return cy.getByDataGtmId(mainPageLocators.burgerMenuButtonLocator);
    }

    getBurgerHomeButton() {
        return cy.getByDataGtmId(mainPageLocators.burgerHomeButtonLocator);
    }

    getSettingsButton() {
        return cy.get(mainPageLocators.settingsButtonLocator);
    }

    getAppHolder() {
        return cy.get(mainPageLocators.appHolderLocator);
    }

    getContent() {
        return cy.get(mainPageLocators.contentLocator);
    }

    getLeftMenu() {
        return cy.get(mainPageLocators.leftMenuLocator);
    }

    getFilterInbox() {
        return cy.get(mainPageLocators.filterInboxLocator);
    }

    getFilterToday() {
        return cy.get(mainPageLocators.filterTodayLocator);
    }

    getFilterUpcoming() {
        return cy.get(mainPageLocators.filterUpcomingLocator);
    }

    getFiltersLabels() {
        return cy.get(mainPageLocators.filtersLabelsLocator);
    }

    getAgendaView() {
        return cy.get(mainPageLocators.agendaViewLocator);
    }

    getLogoutButton() {
        return cy.get(mainPageLocators.logoutButton);
    }

    getProjectByName(projectName) {
        return cy.get(`a[aria-label^='${projectName}']`)
    }

    getProjectById(projectId) {
        return cy.get(`#projects_list > li[data-id='${projectId}']`)
    }
}

export default MainPage;