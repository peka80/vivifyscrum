import loginPage from "../pages/loginPage.json";
import header from "../pages/header.json";
import orgPage from "../pages/orgPage.json";
import addOrgModal from "../pages/addOrgModal.json";
import boardPage from "../pages/boardPage.json";
import projectMenu from "../pages/projectMenu.json";
import dialogModal from "../pages/dialogModal.json";
import sidebar from "../pages/sidebar.json";
import data from "../fixtures/data.json";

describe("Oragnization CRUD tests", () => {
  before(() => {
    cy.visit("/");

    cy.get(loginPage.emailInput).type(Cypress.env("email"));
    cy.get(loginPage.passwordInput).type(Cypress.env("password"));
    cy.get(loginPage.logInButton).click();

    cy.url().should("contain", "/my-organizations");

    cy.get(header.headerTitleSpan)
      .should("be.visible")
      .and("contain", data.myOrgHeader);

    cy.get(sidebar.accountImg).should("exist").and("be.visible");
  });

  it("VSO-CRUD01 Create organization - no name - negative", () => {
    cy.get(orgPage.addOrgH2).click();

    cy.get(addOrgModal.nextButton).should("be.disabled");
    cy.get(addOrgModal.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[0]).to.have.class("active");
      });
    cy.get(addOrgModal.cancelButton).click();
  });
  it("VSO-CRUD02 Create organization - positive", () => {
    cy.get(orgPage.addOrgH2).click();
    cy.get(addOrgModal.orgNameInput).clear().type(data.nameOrg);

    cy.get(addOrgModal.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[0]).to.have.class("active");
      });

    cy.get(addOrgModal.nextButton).click();

    cy.get(addOrgModal.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[1]).to.have.class("active");
      });
    cy.get(addOrgModal.orgTitleH2).should("have.text", data.nameOrg);
    cy.get(addOrgModal.nextButton).click();
    cy.get(boardPage.boardModalOkButton).click();

    cy.get(sidebar.boardAsideAnchore)
      .should("exist")
      .and("contain", data.nameOrg);
  });

  it("VSO-CRUD03 Read last created organization", () => {
    cy.get(header.myOrganizationsImg).click();
    cy.get(orgPage.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.contain(data.nameOrg);
      });
    cy.get(orgPage.boardDiv).eq(-2).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(sidebar.boardAsideAnchore)
      .should("exist")
      .and("contain", data.nameOrg);
  });

  it("VSO-CRUD04 Change last created organization name - positive", () => {
    cy.get(header.myOrganizationsImg).click();
    cy.get(orgPage.editOrgNameSpan).eq(-2).click();
    cy.get(orgPage.orgNameUpdateInput).clear().type(data.nameOrgEdit);
    cy.get(orgPage.saveEditeNameButton).click();

    cy.get(sidebar.boardAsideAnchore)
      .should("exist")
      .and("contain", data.nameOrgEdit);
    cy.get(orgPage.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.contain(data.nameOrgEdit);
      });
  });

  it("VSO-CRUD05 Delete organization - positive", () => {
    cy.get(orgPage.boardDiv).eq(-2).click();
    cy.get(boardPage.boardModalOkButton).click();
    cy.get(projectMenu.configOrgLi).click();
    cy.get(projectMenu.deleteOrgButton).eq(4).click();
    cy.get(dialogModal.passwordConfirmInput).type(data.userPass);
    cy.get(dialogModal.yesButton).click();

    cy.get(sidebar.boardAsideAnchore).should("not.exist");
    cy.get(orgPage.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.not.contain(data.nameOrgEdit);
      });
  });

  after("Logout from VivifyScrum", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();

    cy.url().should("contain", "/login");

    cy.get(sidebar.accountImg).should("not.exist");
  });
});
