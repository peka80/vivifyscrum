import user from "../../api/user";
import organization from "../../api/organization";

describe("APIO - Organization CRUD", () => {
  let token;
  let organizationData;
  let allOrganizations;

  before(() => {
    user.login({ testName: Cypress.currentTest.title }).then((response) => {
      token = response.token;
    });
  });

  it("APIO - 01 - Create Org - positive", () => {
    organization
      .post({
        name: "API Org",
        token: token,
        statusCode: 201,
        testName: Cypress.currentTest.title,
      })
      .then((response) => {
        organizationData = response;
      });
  });

  it("APIO - 02 - update org name", () => {
    organization.update({
      nameUpdate: "API Org Update",
      token: token,
      testName: Cypress.currentTest.title,
      orgId: organizationData.id,
    });
  });

  it("APIO - 03 - empty name", () => {
    organization.post({
      name: "",
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 04 - object", () => {
    organization.post({
      name: {},
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 05 - array", () => {
    organization.post({
      name: [],
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 06 - sql inject", () => {
    organization.post({
      name: "{}$",
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 07 - sql inject 2", () => {
    organization.post({
      name: "````",
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 08 - white space", () => {
    organization.post({
      name: "     ",
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
    });
  });

  it("APIO - 00 - get organizations", () => {
    organization
      .get({
        token: token,
        statusCode: 200,
        testName: Cypress.currentTest.title,
      })
      .then((response) => {
        allOrganizations = response;
      });
  });

  it("APIO - 09 - delete all orgs", () => {
    let counter = 0;
    allOrganizations.forEach((org) => {
      organization.delete({
        orgId: org.id,
        token: token,
        testName: `${Cypress.currentTest.title} --- ${counter} --- ${org.name}`,
      });
      counter++;
    });
  });
});
