import header from "../pages/header.json";
import loginPage from "../pages/loginPage.json";
import projectMenu from "../pages/projectMenu.json";
import sidebar from "../pages/sidebar.json";
import data from "../fixtures/data.json";

describe("Login to VivifyScrum", () => {
  it("VSL-CRUD01 Login - all empty fields - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(data.errorMsg.emailField);
        expect($span[1].innerText).to.eq(data.errorMsg.passField);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD02 Login - password empty - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[1].innerText).to.eq(data.errorMsg.passField);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD03 Login - email empty - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(data.errorMsg.emailField);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD04 Login - email no @ - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.noMonkey);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(data.errorMsg.emailField);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD05 Login - email no domain - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.noDomain);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[0].innerText).to.eq(data.errorMsg.emailField);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD06 Login - wrong email - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.wrongEmail);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.invEmailPassSpan).should(($span) => {
      expect($span).to.contain(data.errorMsg.oopsMsg);
    });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD07 Login - less then 5 char password - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.passwordInput).type(data.invPass.lessCharPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.validationSpan)
      .children()
      .should("have.length", 2)
      .then(($span) => {
        expect($span[1].innerText).to.eq(data.errorMsg.passCharNum);
      });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD08 Login - wrong password - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.passwordInput).type(data.invPass.wrongPass);
    cy.get(loginPage.logInButton).click();

    cy.get(loginPage.invEmailPassSpan).should(($span) => {
      expect($span).to.contain(data.errorMsg.oopsMsg);
    });

    cy.url().should("contain", "/login");
  });

  it("VSL-CRUD08 Login - valid credential - positive", () => {
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

  it("VSL-CRUD09 Logout", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();

    cy.url().should("contain", "/login");

    cy.get(sidebar.accountImg).should("not.exist");
  });
});
