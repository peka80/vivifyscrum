import loginPage from "../pages/loginPage.json";
import header from "../pages/header.json";
import orgPage from "../pages/orgPage.json";
import addOrgModal from "../pages/addOrgModal.json";
import boardPage from "../pages/boardPage.json";
import projectMenu from "../pages/projectMenu.json";
import dialogModal from "../pages/dialogModal.json";
import sidebar from "../pages/sidebar.json";

describe("Oragnization CRUD tests", () => {
  it("VSO-CRUD01 Visit link and login", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type("peka.dragovic@outlook.com");
    cy.get(loginPage.passwordInput).type("1.gold777");
    cy.get(loginPage.logInButton).click();
  });

  it("VSO-CRUD02 Create organization - positive", () => {
    cy.get(orgPage.addOrgH2).click();
    cy.get(addOrgModal.orgNameInput).clear().type("01 Org Cypress");
    cy.get(addOrgModal.nextButton).click();
    cy.get(addOrgModal.nextButton).click();
    cy.get(boardPage.boardModalOkButton).click();
  });

  it("VSO-CRUD03 Read last created organization", () => {
    cy.get(header.myOrganizationsImg).click();
    cy.get(orgPage.boardDiv).eq(-2).click();
    cy.get(boardPage.boardModalOkButton).click();
  });

  it("VSO-CRUD04 Change last created organization name - positive", () => {
    cy.get(header.myOrganizationsImg).click();
    cy.get(orgPage.editOrgNameSpan).eq(-2).click();
    cy.get(orgPage.orgNameUpdateInput).clear().type("01 Edit Org Cypress");
    cy.get(orgPage.saveEditeNameButton).click();
  });

  it("VSO-CRUD05 Delete last created Organization", () => {
    cy.get(orgPage.boardDiv).eq(-2).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(projectMenu.configOrgLi).click();
    cy.get(projectMenu.deleteOrgButton).contains("Delete").click();
    cy.get(dialogModal.passwordConfirmInput).type("1.gold777");
    cy.get(dialogModal.yesButton).click();
  });

  it("VSO-CRUD06 Logout user", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();
  });
});
