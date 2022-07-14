import data from "../fixtures/dataApi.json";
import consoleColor from "../support/consoleColor";

module.exports = {
  get({ token = "", statusCode = "", testName = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `${data.apiBaseUrl}/api/v2/my-organizations`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? consoleColor.log(`${testName} -- PASS`, "success")
          : consoleColor.log(
              `${testName} -- FAIL \n ${JSON.stringify(response)}`,
              "error"
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },

  post({
    name = "",
    token = "",
    statusCode = "",
    testName = "",
    type = "",
    orgId = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: `${data.apiBaseUrl}/api/v2/boards`,
        body: {
          name: name,
          type: type,
          organization_id: orgId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? consoleColor.log(`${testName} -- PASS`, "success")
          : consoleColor.log(
              `${testName} -- FAIL \n ${JSON.stringify(response)}`,
              "error"
            );
        expect(response.status).to.eql(statusCode);
        return response.body;
      });
  },

  update({
    token = "",
    statusCode = 200,
    testName = "",
    boardId = "",
    boardCode = "",
    nameUpdate = "",
  }) {
    cy.request({
      failOnStatusCode: false,
      method: "PUT",
      url: `${data.apiBaseUrl}/api/v2/boards/${boardId}`,
      body: {
        name: nameUpdate,
        id: boardId,
        code: boardCode,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      typeof response.status !== "undefined" && response.status === statusCode
        ? consoleColor.log(`${testName} -- PASS`, "success")
        : consoleColor.log(
            `${testName} -- FAIL \n ${JSON.stringify(response)}`,
            "error"
          );
      expect(response.status).to.eql(statusCode);
      return response.body;
    });
  },

  delete({ token = "", statusCode = 200, testName = "", boardId = "" }) {
    cy.request({
      failOnStatusCode: false,
      method: "DELETE",
      url: `${data.apiBaseUrl}/api/v2/boards/${boardId}`,
      body: {
        id: boardId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      typeof response.status !== "undefined" && response.status === statusCode
        ? consoleColor.log(`${testName} -- PASS`, "success")
        : consoleColor.log(
            `${testName} -- FAIL \n ${JSON.stringify(response)}`,
            "error"
          );
      expect(response.status).to.eql(statusCode);
      return response.body;
    });
  },
};
