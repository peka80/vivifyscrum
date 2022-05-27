import header from "../pages/header.json";
import loginPage from "../pages/loginPage.json";
import sidebar from "../pages/sidebar.json";
import boardPage from "../pages/boardPage.json";
import orgPage from "../pages/orgPage.json";
import addOrgModal from "../pages/addOrgModal.json";
import projectMenu from "../pages/projectMenu.json";
import dialogModal from "../pages/dialogModal.json";
import addBoardModal from "../pages/addBoardModal.json";
import data from "../fixtures/data.json";

describe("Column Board CRUD tests", () => {
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

  beforeEach("Create organization ", () => {
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

  it("VSB-CRUD01 Create SCRUM board - no name - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();

    cy.get(addBoardModal.boardDotPagLi)
      .eq(1)
      .should("not.have.class", "active");
    cy.get(addBoardModal.nextButton).should("be.disabled");
    cy.get(addBoardModal.closeBoardModalButton).click();
  });
  it("VSB-CRUD02 Create SCRUM board - board type not checked - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();

    cy.get(addBoardModal.boardDotPagLi)
      .eq(2)
      .should("not.have.class", "active");
    cy.get(addBoardModal.nextButton).should("be.disabled");
    cy.get(addBoardModal.closeBoardModalButton).click();
  });

  it("VSB-CRUD03 Create SCRUM board", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.boardDotPagLi)
      .eq(2)
      .should("not.have.class", "active");

    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(addBoardModal.boardDotPagLi)
      .eq(3)
      .should("not.have.class", "active");

    cy.get(addBoardModal.nextButton).click();

    cy.get(addBoardModal.boardDotPagLi).eq(3).should("have.class", "active");

    cy.get(addBoardModal.nextButton).click();

    cy.get(sidebar.boardLi).should("be.visible").and("contain", data.nameBoard);
    cy.get(header.boardTitleH1)
      .should("be.visible")
      .and("contain", data.nameBoard);
  });

  it("VSB-CRUD04 Edit created board - no name - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear();

    cy.get(projectMenu.boardValidSpan)
      .eq(0)
      .should("be.visible")
      .and("contain", data.boardConfig.nameValidReq);

    cy.get(projectMenu.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  });

  it("VSB-CRUD05 Edit created board - 51 characters - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear().type(data.nameBoard51Char);

    cy.get(projectMenu.boardValidSpan)
      .eq(0)
      .should("be.visible")
      .and("contain", data.boardConfig.nameValidNum);

    cy.get(projectMenu.boardUpdateButton)
      .contains("Update")
      .then(($btn) => {
        expect($btn).to.have.css("background-color", "rgb(78, 174, 147)");
      });
  });

  it("VSB-CRUD06 Edit created board - no code - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear().type(data.nameBoard);
    cy.get(projectMenu.boardCodeInput).clear();

    cy.get(projectMenu.boardValidSpan)
      .eq(1)
      .should("be.visible")
      .and("contain", data.boardConfig.codeValidReq);
    cy.get(projectMenu.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  });

  it("VSB-CRUD07 Edit created board - no name/code - negative", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear();
    cy.get(projectMenu.boardCodeInput).clear();

    cy.get(projectMenu.boardValidSpan)
      .should("have.length", 3)
      .then(($span) => {
        expect($span[0].innerText).to.eq(data.boardConfig.nameValidReq);
        expect($span[1].innerText).to.eq(data.boardConfig.codeValidReq);
      });

    cy.get(projectMenu.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  });

  it("VSB-CRUD08 Edit created board", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.boardTitleInput).clear().type(data.nameBoardEdit);
    cy.get(projectMenu.boardDescriptTextarea).type(data.descriptBoard);
    cy.get(projectMenu.boardUpdateButton).click();

    cy.get(sidebar.boardLi)
      .should("be.visible")
      .and("contain", data.nameBoardEdit);
    cy.get(header.boardTitleH1)
      .should("be.visible")
      .and("have.attr", "title", data.nameBoardEdit);
  });

  it("VSB-CRUD09 Delete board", () => {
    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(boardPage.addNewBoardSpan).eq(-1).click();
    cy.get(addBoardModal.boardTitleInput).clear().type(data.nameBoard);
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.scrumSpan).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();
    cy.get(addBoardModal.nextButton).click();

    cy.get(sidebar.boardAsideAnchore).eq(-1).click();
    cy.get(projectMenu.boarConfgLi).click();
    cy.get(projectMenu.deleteBoard).eq(3).click();
    cy.get(dialogModal.yesButton).click();

    cy.get(sidebar.boardLi).should("not.exist");
    cy.get(header.boardTitleH1).should("not.exist");
  });

  afterEach("Delete organization", () => {
    cy.get(sidebar.boardAsideAnchore).eq(0).click();
    cy.get(projectMenu.configOrgLi).click();
    cy.get(projectMenu.deleteOrgButton).eq(4).click();
    cy.get(dialogModal.passwordConfirmInput).type(data.userPass);
    cy.get(dialogModal.yesButton).click();
  });

  after("Logout from VivifyScrum", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();
  });
});
