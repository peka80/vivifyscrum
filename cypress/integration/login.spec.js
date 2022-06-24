import data from "../fixtures/data.json";
import Login from "../support/classes/login";
import Utils from "../support/classes/utils";

const login = new Login();
const utils = new Utils();

describe("Login to VivifyScrum", () => {
  beforeEach(() => {
    utils.visitUrl(Cypress.config("baseUrl"));
  });
  it("VSL-CRUD01 Login - all empty fields - Negative", () => {
    login.assertEmptyFields(data.errorMsg.emailField, data.errorMsg.passField);
  });

  it("VSL-CRUD02 Login - password empty - Negative", () => {
    login.assertNoPassword(Cypress.env("email"), data.errorMsg.passField);
  });

  it("VSL-CRUD03 Login - email empty - Negative", () => {
    login.assertNoEmail(data.errorMsg.emailField, Cypress.env("password"));
  });

  it("VSL-CRUD04 Login - email no @ - Negative", () => {
    login.assertNoMonkeySignEmail(
      data.invEmail.noMonkey,
      Cypress.env("password"),
      data.errorMsg.emailField
    );
  });

  it("VSL-CRUD05 Login - email no domain - Negative", () => {
    login.assertNoMonkeySignEmail(
      data.invEmail.noDomain,
      Cypress.env("password"),
      data.errorMsg.emailField
    );
  });

  it("VSL-CRUD06 Login - wrong email - Negative", () => {
    login.assertWrongEmail(
      data.invEmail.wrongEmail,
      Cypress.env("password"),
      data.errorMsg.oopsMsg
    );
  });

  it("VSL-CRUD07 Login - less then 5 char password - Negative", () => {
    login.assertLessCharPass(
      Cypress.env("email"),
      data.invPass.lessCharPass,
      data.errorMsg.passCharNum
    );
  });

  it("VSL-CRUD08 Login - wrong password - Negative", () => {
    login.assertWrongPass(
      Cypress.env("email"),
      data.invPass.wrongPass,
      data.errorMsg.oopsMsg
    );
  });

  it("VSL-CRUD08 Login & Logout - valid credential - positive", () => {
    login.loginThenLogoutTheUser(
      Cypress.env("email"),
      Cypress.env("password"),
      data.myOrgHeader
    );
  });
});
