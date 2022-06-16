import data from "../fixtures/data.json";
import Utils from "../support/classes/utils";
import Org from "../support/classes/organization";
import OrgModal from "../support/classes/orgModal";

const utils = new Utils();
const org = new Org();
const orgModal = new OrgModal();

describe("Oragnization CRUD tests", () => {
  beforeEach("Login", () => {
    cy.loginViaAPI();

    utils.visitUrl(Cypress.config("baseUrl"));
  });

  it("VSO-CRUD01 Create organization - no name - negative", () => {
    orgModal.assertNoOrgName();
  });

  it("VSO-CRUD02 Create organization - no logo img - positive", () => {
    cy.createOrgViaAPI(data.nameOrg);
  });

  it("VSO-CRUD03 Read last created organization", () => {
    org.viewCreatedOrg(data.nameOrg);
  });

  it("VSO-CRUD04 Change last created organization name - positive", () => {
    cy.updateOrgViaAPI(data.nameOrgEdit);
  });

  it("VSO-CRUD05 Delete organization - positive", () => {
    cy.deleteOrgViaAPI();
  });

  after("Logout from VivifyScrum", () => {
    cy.logoutViaUI();
  });
});
