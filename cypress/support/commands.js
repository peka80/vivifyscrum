// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Login from "../support/classes/login";

const login = new Login();
let orgID;

Cypress.Commands.add("loginViaAPI", () => {
  cy.request({
    method: "POST",
    url: Cypress.config("apiUrl") + "/api/v2/login",
    body: {
      email: Cypress.env("email"),
      "g-recaptcha-response": "",
      password: Cypress.env("password"),
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
    expect(response.body).to.have.property("user");
    window.localStorage.setItem("token", response.body.token);
    window.localStorage.setItem("user_id", response.body.user.id);
    window.localStorage.setItem("user", JSON.stringify(response.body.user));
  });
});

Cypress.Commands.add("logoutViaUI", () => {
  login.logoutUser();
});

Cypress.Commands.add("createOrgViaAPI", (orgName) => {
  cy.request({
    method: "POST",
    url: `${Cypress.config("apiUrl")}/api/v2/organizations`,
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: {
      name: orgName,
    },
  }).then((response) => {
    expect(response.status).to.equal(201);
    orgID = response.body.id;
  });
});

Cypress.Commands.add("updateOrgViaAPI", (updatedName) => {
  cy.request({
    method: "PUT",
    url: `${Cypress.config("apiUrl")}/api/v2/organizations/${orgID}`,
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: {
      name: updatedName,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(updatedName);
  });
});

Cypress.Commands.add("deleteOrgViaAPI", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.config("apiUrl")}/api/v2/organizations/${orgID}`,
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: {
      passwordOrEmail: Cypress.env("password"),
    },
  }).then((response) => {
    expect(response.status).to.equal(201);
  });
});
