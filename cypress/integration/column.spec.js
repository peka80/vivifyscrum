import header from "../pages/header.json";
import loginPage from "../pages/loginPage.json";
import sidebar from "../pages/sidebar.json";
import boardPage from "../pages/boardPage.json";
import orgPage from "../pages/orgPage.json";
import addOrgModal from "../pages/addOrgModal.json";
import projectMenu from "../pages/projectMenu.json";
import dialogModal from "../pages/dialogModal.json";
import addBoardModal from "../pages/addBoardModal.json";
import columnPage from "../pages/columnPage.json";
import taskModal from "../pages/taskModal.json";
import data from "../fixtures/data.json";

describe("Column Task CRUD tests", () => {
  it("VSCT-CRUD01 Visit link and login", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSCT-CRUD02 Create organization", () => {
    cy.get(orgPage.addOrgH2).click();
    cy.get(addOrgModal.orgNameInput).clear().type(data.nameOrg);
    cy.get(addOrgModal.nextButton).click();
    cy.get(addOrgModal.nextButton).click();
    cy.get(boardPage.boardModalOkButton).click();
  });

  it("VSCT-CRUD03 Create SCRUM board", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.orgInput).click();
    cy.get(addBoardModal.orgListSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput)
      .clear()
      .type("01 Board Cypress Scrum");
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
  });

  it("VSCT-CRUM04 Add new column", () => {
    cy.get(columnPage.addNewColumnButton).eq(5).click();
    cy.get(columnPage.columnNameInput).type(data.nameColumn);
  });

  it("VSCT-CRUM05 Create task", () => {
    cy.get(columnPage.addTaskButton).eq(1).click({ force: true });
    cy.get(columnPage.taskNameTextarea).type(data.nameTask);
    cy.get(columnPage.saveTaskNameButton).click();
  });

  it("VSCT-CRUM06 Edit task title", () => {
    cy.wait(1000);
    cy.get(columnPage.cardBodyP).eq(1).click();
    cy.get(taskModal.taskTitleH2).click();
    cy.get(taskModal.taskTitelTextarea).clear().type(data.editNameTask);
    cy.get(taskModal.taskTitleButton).eq(1).click();
  });

  it("VSCT-CRUM07 Move created task", () => {
    cy.get(taskModal.sprintInfoDiv).click();
    cy.get(taskModal.changeColumnList).eq(2).click();
  });

  it("VSCT-CRUM08 Delete task", () => {
    cy.get(taskModal.dropdownButton).click();
    cy.get(taskModal.deleteTaskList).eq(0).click();
    cy.get(dialogModal.yesButton).click();
  });

  it("VSCT-CRUM09 Start Sprint", () => {
    cy.get(columnPage.columnOptionButton).eq(1).click();
    cy.get(columnPage.startSprint).eq(2).click();
    cy.get(dialogModal.sprintGoalTextarea).clear().type(data.sprintDescript);
    cy.get(dialogModal.yesButton).click();
  });

  it("VSCT-CRUM10 Delete Organization", () => {
    cy.get(sidebar.boardAsideAnchore).eq(0).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(projectMenu.configOrgLi).click();
    cy.get(projectMenu.deleteOrgButton).eq(4).click();
    cy.get(dialogModal.passwordConfirmInput).type(data.userPass);
    cy.get(dialogModal.yesButton).click();
  });

  it("VSCT-CRUM10 Logout", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();
  });
});
