import { mainPageLocators } from "../support/locators";

class MainPage {

    //header bar:
    getTopBar() {
        return cy.get(mainPageLocators.topBarLocator);
    }

    getBurgerMenuButton() {
        return cy.getByDataGtmId(mainPageLocators.burgerMenuButtonLocator);
    }

    getBurgerHomeButton() {
        return cy.getByDataGtmId(mainPageLocators.burgerHomeButtonLocator);
    }

    getAddNewTaskButton() {
        return cy.get(mainPageLocators.createNewTaskButtonLocator);
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

    //left menu:
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

    getProjectByName(projectName) {
        return cy.get(`a[aria-label^='${projectName}']`)
    }

    getProjectById(projectId) {
        return cy.get(`#projects_list > li[data-id='${projectId}']`)
    }

    //create task:
    getTaskEditorForm() {
        return cy.get(mainPageLocators.taskEditorFormLocator);
    }

    getTaskEditorContentField() {
        return cy.get(mainPageLocators.taskEditorContentFieldLocator);
    }

    writeValueInTaskEditorContentField(value) {
        this.getTaskEditorContentField()
            .clear()
            .type(value);
    }

    getTaskEditorDescriptionContainer() {
        return cy.get(mainPageLocators.taskEditorDescriptionContainerLocator);
    }

    writeValueInTaskEditorDescriptionContainer(value) {
        this.getTaskEditorDescriptionContainer()
            .clear()
            .type(value);
    }

    getRemoveDueDate() {
        return cy.getByAriaLabel('Remove due date');
    }

    getTaskPriorityByValue(value) {
        return cy.get(`div[data-priority='${value}']`);
    }

    getSetPriority() {
        return cy.getByAriaLabel('Set priority');
    }

    selectPriorityFromTheListOfPrioritiesByValue(value) {
        return cy.get(`ul[aria-label='Select a priority'] > li[aria-label='Priority ${value}']`);
    }

    getSelectAProject() {
        return cy.getByAriaLabel('Select a project');
    }

    getProjectSearch() {
        return cy.getByAriaLabel('Type a project');
    }

    writeValueInProjectSearch(value) {
        this.getProjectSearch()
            .clear()
            .type(`${value}{enter}`);
    }

    getCancelButtonInTaskCreationForm() {
        return cy.getByAriaLabel('Cancel');
    }

    getCreateNewTaskButtonInTaskCreationForm() {
        return cy.get(mainPageLocators.createNewTaskButtonInTaskCreationFormLocator);
    }

    //project dashboard:
    getProjectDashboardByProjectId(projectId) {
        return cy.get(`div[data-project-list-id='${projectId}']`);
    }

    getListOfProjectItems() {
        return cy.get(mainPageLocators.listOfProjectItemsLocator);
    }

    getTaskContent() {
        return cy.get(mainPageLocators.taskContentLocator);
    }

    getTaskDescription() {
        return cy.get(mainPageLocators.taskDescriptionLocator);
    }

    getTaskLabel() {
        return cy.get(mainPageLocators.taskLabelLocator);
    }

    getTaskById(taskId) {
        return cy.get(`div#task-${taskId}-content`);
    }
}

export default MainPage;