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

  post({ name = "", token = "", statusCode = "", testName = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: `${data.apiBaseUrl}/api/v2/organizations`,
        body: {
          name: name,
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
    orgId = "",
    nameUpdate = "",
  }) {
    cy.request({
      failOnStatusCode: false,
      method: "PUT",
      url: `${data.apiBaseUrl}/api/v2/organizations/${orgId}`,
      body: {
        name: nameUpdate,
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

  delete({
    token = "",
    statusCode = 201,
    testName = "",
    orgId = "",
    password = data.user.password,
  }) {
    cy.request({
      failOnStatusCode: false,
      method: "POST",
      url: `${data.apiBaseUrl}/api/v2/organizations/${orgId}`,
      body: {
        passwordOrEmail: password,
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
