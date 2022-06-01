import data from "../fixtures/data.json";
import Utils from "../support/classes/utils";
import Login from "../support/classes/login";
import Org from "../support/classes/organization";
import OrgModal from "../support/classes/orgModal";

const utils = new Utils();
const login = new Login();
const org = new Org();
const orgModal = new OrgModal();

describe("Oragnization CRUD tests", () => {
  before("Login", () => {
    utils.visitUrl(Cypress.config("baseUrl"));

    login.loginUserValid(
      Cypress.env("email"),
      Cypress.env("password"),
      data.myOrgHeader
    );
  });

  it("VSO-CRUD01 Create organization - no name - negative", () => {
    orgModal.assertNoOrgName();
  });

  it("VSO-CRUD02 Create organization - no logo img - positive", () => {
    orgModal.createOrgNoAvatar(data.nameOrg);
  });

  it("VSO-CRUD03 Read last created organization", () => {
    org.viewCreatedOrg(data.nameOrg, data.nameOrg);
  });

  it("VSO-CRUD04 Change last created organization name - positive", () => {
    org.editOrgName(data.nameOrgEdit, data.nameOrgEdit, data.nameOrgEdit);
  });

  it("VSO-CRUD05 Delete organization - positive", () => {
    org.deleteOrg(data.userPass, data.nameOrgEdit);
  });

  after("Logout from VivifyScrum", () => {
    login.logoutUser();
  });
});
