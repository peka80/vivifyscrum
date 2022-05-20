import header from "../pages/header.json";
import loginPage from "../pages/loginPage.json";
import projectMenu from "../pages/projectMenu.json";
import sidebar from "../pages/sidebar.json";
import data from "../fixtures/data.json";

describe("Logoin to VivifyScrum", () => {
  it("VSL-CRUD01 Login - all empty fields - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD02 Login - password empty - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD03 Login - email empty - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD04 Login - email no @ - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.noMonkey);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD05 Login - email no domain - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.noDomain);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD06 Login - email space - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.space);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD07 Login - wrong email - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.invEmail.wrongEmail);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD08 Login - wrong password - Negative", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.passwordInput).type(data.invPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD09 Login - valid credential - positive", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.userEmail);
    cy.get(loginPage.passwordInput).type(data.userPass);
    cy.get(loginPage.logInButton).click();
  });

  it("VSL-CRUD10 Logout", () => {
    cy.get(sidebar.accountImg).click();
    cy.get(projectMenu.accountProfileLi).click();
    cy.get(header.logOutButton).click();
  });
});
