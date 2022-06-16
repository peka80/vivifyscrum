import data from "../fixtures/data.json";
import Utils from "../support/classes/utils";
import Login from "../support/classes/login";
import OrgModal from "../support/classes/orgModal";
import Org from "../support/classes/organization";
import BoardModal from "../support/classes/boardModal";

const utils = new Utils();
const login = new Login();
const orgModal = new OrgModal();
const org = new Org();
const boardModal = new BoardModal();

describe("Column Board CRUD tests", () => {
  before("Login to VivifyScrum", () => {
    cy.loginViaAPI();

    utils.visitUrl(Cypress.config("baseUrl"));
  });

  beforeEach("Create organization ", () => {
    orgModal.createOrgNoAvatar(data.nameOrg);
  });

  it("VSB-CRUD01 Create SCRUM board - no name - negative", () => {
    boardModal.assertBoardNoName();
  });
  it("VSB-CRUD02 Create SCRUM board - board type not checked - negative", () => {
    boardModal.assertBoardType(data.nameBoard);
  });

  it("VSB-CRUD03 Create SCRUM board", () => {
    boardModal.createBoard(data.nameBoard);
  });

  it("VSB-CRUD04 Edit created board - no name - negative", () => {
    boardModal.assertEditNoName(data.nameBoard, data.boardConfig.nameValidReq);
  });

  it("VSB-CRUD05 Edit created board - 51 characters - negative", () => {
    boardModal.assertEdit51CharName(
      data.nameBoard,
      data.nameBoard51Char,
      data.boardConfig.nameValidNum
    );
  });

  it("VSB-CRUD06 Edit created board - no code - negative", () => {
    boardModal.assertEditNoCode(data.nameBoard, data.boardConfig.codeValidReq);
  });

  it("VSB-CRUD07 Edit created board - no name/code - negative", () => {
    boardModal.assertNoCodeNoName(
      data.nameBoard,
      data.boardConfig.nameValidReq,
      data.boardConfig.codeValidReq
    );
  });

  it("VSB-CRUD08 Edit created board", () => {
    boardModal.editCreatedBoard(
      data.nameBoard,
      data.nameBoardEdit,
      data.descriptBoard
    );
  });

  it("VSB-CRUD09 Delete board", () => {
    boardModal.deleteBoard(data.nameBoard);
  });

  afterEach("Delete organization", () => {
    org.deleteOrgBoard(data.userPass);
  });

  after("Logout from VivifyScrum", () => {
    login.logoutUser();
  });
});
