import header from "../pages/header.json";
import loginPage from "../pages/loginPage.json";
import sidebar from "../pages/sidebar.json";
import boardPage from "../pages/boardPage.json";
import orgPage from "../pages/orgPage.json";
import addOrgModal from "../pages/addOrgModal.json";
import projectMenu from "../pages/projectMenu.json";
import dialogModal from "../pages/dialogModal.json";
import addBoardModal from "../pages/addBoardModal.json";

describe("Column Board CRUD tests", () => {
  it("VSB-CRUD01 Visit link and login", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type("peka.dragovic@outlook.com");
    cy.get(loginPage.passwordInput).type("1.gold777");
    cy.get(loginPage.logInButton).click();
  });

  it("VSB-CRUD02 Create organization", () => {
    cy.get(orgPage.addOrgH2).click();
    cy.get(addOrgModal.orgNameInput).clear().type("Org Cypress");
    cy.get(addOrgModal.nextButton).click();
    cy.get(addOrgModal.nextButton).click();
    cy.get(boardPage.boardModalOkButton).click();
  });

  it("VSB-CRUD03 Create SCRUM board - no name - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.orgInput).click();
    cy.get(addBoardModal.orgListSpan).eq(-1).click();
    cy.get(addBoardModal.nextButton).click({ force: true });
  });
  it("VSB-CRUD04 Create SCRUM board - board type not checked - negative", () => {
    cy.get(addBoardModal.boardTitleInput)
      .clear()
      .type("01 Board Cypress Scrum");
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click({ force: true });
  });

  it("VSB-CRUD05 Create SCRUM board", () => {
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
  });

  it("VSB-CRUD06 Edit created board - no name - negative", () => {
    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear();
    cy.get(projectMenu.boardUpdateButton).click({ force: true });
  });

  it("VSB-CRUD07 Edit created board", () => {
    cy.get(projectMenu.boardTitleInput).clear().type("02 EDIT Board Scrum");
    cy.get(projectMenu.boardDescriptTextarea).type("Opis za kreirani board");
    cy.get(projectMenu.boardUpdateButton).click();
  });

  it("VSB-CRUD08 Create second Kanban board", () => {
    cy.get(sidebar.boardAsideAnchore).eq(0).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(boardPage.addNewBoardDiv).click();
    cy.get(addBoardModal.orgInput).click();
    cy.get(addBoardModal.orgListSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type("New Kanban Board");
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.kanbanSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
  });

  it("VSB-CRUD09 Delete all boards", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.deleteBoard).eq(3).click();
    cy.get(dialogModal.yesButton).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.deleteBoard).eq(3).click();
    cy.get(dialogModal.yesButton).click();
  });

  it("VSB-CRUD10 Delete Organization", () => {
    cy.get(sidebar.boardAsideAnchore).eq(0).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(projectMenu.configOrgLi).click();
    cy.get(projectMenu.deleteOrgButton).eq(4).click();
    cy.get(dialogModal.passwordConfirmInput).type("1.gold777");
    cy.get(dialogModal.yesButton).click();
  });

  it("VSB-CRUD11 Logout", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();
  });
});
