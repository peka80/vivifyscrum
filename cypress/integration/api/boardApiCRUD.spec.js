import dataApi from "../../fixtures/dataApi.json";
import user from "../../api/user";
import organization from "../../api/organization";
import board from "../../api/board";

describe("APIB - Board CRUD", () => {
  let token;
  let organizationData;
  let boardData;
  let allOrganizations;

  beforeEach("Login and create organization", () => {
    user.login({ testName: Cypress.currentTest.title }).then((response) => {
      token = response.token;

      organization
        .post({
          name: "API Org with Board",
          token: token,
          statusCode: 201,
          testName: Cypress.currentTest.title,
        })
        .then((response) => {
          organizationData = response;
        });
    });
  });

  it("APIB - 01 - Create Board - positive", () => {
    board.post({
      name: "API Board",
      token: token,
      statusCode: 201,
      testName: Cypress.currentTest.title,
      orgId: organizationData.id,
      type: dataApi.boardType.scrum,
    });
  });

  it("APIB - 02 - Update Board name - positive", () => {
    board
      .post({
        name: "API Board",
        token: token,
        statusCode: 201,
        testName: Cypress.currentTest.title,
        orgId: organizationData.id,
        type: dataApi.boardType.scrum,
      })
      .then((response) => {
        boardData = response;

        board.update({
          nameUpdate: "API Board EDIT",
          token: token,
          testName: Cypress.currentTest.title,
          boardId: boardData.id,
          boardCode: boardData.code,
        });
      });
  });

  it("APIB - 03 - Empty name - negative", () => {
    board.post({
      name: "",
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
      orgId: organizationData.id,
      type: dataApi.boardType.scrum,
    });
  });

  it("APIB - 04 - 51 characters name - negative", () => {
    board.post({
      name: dataApi.invalidNames.longName,
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
      orgId: organizationData.id,
      type: dataApi.boardType.scrum,
    });
  });

  it("APIB - 05 - object - negative", () => {
    board.post({
      name: {},
      token: token,
      statusCode: 400,
      testName: Cypress.currentTest.title,
      orgId: organizationData.id,
      type: dataApi.boardType.scrum,
    });
  });

  it("APIB - 06 - Delete board", () => {
    board
      .post({
        name: "API Board",
        token: token,
        statusCode: 201,
        testName: Cypress.currentTest.title,
        orgId: organizationData.id,
        type: dataApi.boardType.scrum,
      })
      .then((response) => {
        boardData = response;

        board.delete({
          token: token,
          testName: Cypress.currentTest.title,
          boardId: boardData.id,
        });
      });
  });

  afterEach("Delete All Orgs", () => {
    organization
      .get({
        token: token,
        statusCode: 200,
        testName: Cypress.currentTest.title,
      })
      .then((response) => {
        allOrganizations = response;

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
});
