export const loginPageLocators = {
    loginButtonLocator: "start-email-login",
    emailInputFieldLocator: "#element-0",
    passwordInputFieldLocator: "#element-3"
}

export const mainPageLocators = {
    //top bar:
    topBarLocator: "#top_bar",
    burgerMenuButtonLocator: "burger-menu-toggle",
    burgerHomeButtonLocator: "burger-home-button",
    settingsButtonLocator: "button.settings_btn",
    appHolderLocator: "#app_holder",
    createNewTaskButtonLocator: '#quick_add_task_holder',
    contentLocator: "#content",
    //left menu:
    leftMenuLocator: "#left_menu",
    filterInboxLocator: "#filter_inbox",
    filterTodayLocator: "#filter_today",
    filterUpcomingLocator: "#filter_upcoming",
    filtersLabelsLocator: "#filters_labels",
    agendaViewLocator: "#agenda_view",
    //create task:
    taskEditorFormLocator: "form.task_editor",
    taskEditorContentFieldLocator: "div.task_editor__content_field",
    taskEditorDescriptionContainerLocator: "div.task_editor__description_container",
    createNewTaskButtonInTaskCreationFormLocator: "button[data-testid='task-editor-submit-button']",
    //project dashboard:
    listOfProjectItemsLocator: "ul.items > li.task_list_item",
    taskContentLocator: "div.task_content",
    taskDescriptionLocator: "div.task_description",
    taskLabelLocator: "span.task_list_item__info_tags__label > a > span",
}