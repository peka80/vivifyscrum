import OrgElements from "../../elements/orgElements";
import HeaderElements from "../../elements/headerElements";
import BordElements from "../../elements/bordElements";
import SidebarElements from "../../elements/sidebarElements";
import ProjectMenuElements from "../../elements/projectMenuElements";
import DialogModalElements from "../../elements/dialogModalElements";

class Org {
  openOrgModal() {
    cy.get(OrgElements.addOrgH2).click();
  }

  viewCreatedOrg(orgName) {
    cy.get(HeaderElements.myOrganizationsImg).click();

    cy.get(OrgElements.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.contain(orgName);
      });

    cy.get(SidebarElements.boardAsideAnchore)
      .should("exist")
      .and("contain", orgName);

    cy.get(OrgElements.boardDiv).eq(-2).click();
    cy.get(BordElements.boardModalOkButton).click();
  }

  editOrgName(editName) {
    cy.get(HeaderElements.myOrganizationsImg).click();
    cy.get(OrgElements.editOrgNameSpan).eq(-2).click();
    cy.get(OrgElements.orgNameUpdateInput).clear().type(editName);
    cy.get(OrgElements.saveEditeNameButton).click();

    cy.get(SidebarElements.boardAsideAnchore)
      .should("exist")
      .and("contain", editName);

    cy.get(OrgElements.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.contain(editName);
      });
  }

  deleteOrg(password, nameBoard) {
    cy.get(OrgElements.boardDiv).eq(-2).click();
    cy.get(BordElements.boardModalOkButton).click();
    cy.get(ProjectMenuElements.configOrgLi).click();
    cy.get(ProjectMenuElements.deleteOrgButton).eq(4).click();
    cy.get(DialogModalElements.passwordConfirmInput).type(password);
    cy.get(DialogModalElements.yesButton).click();

    cy.get(SidebarElements.boardAsideAnchore).should("not.exist");
    cy.get(OrgElements.orgDiv)
      .children()
      .should("have.length", 3)
      .then(($board) => {
        expect($board[0]).to.not.contain(nameBoard);
      });
  }

  deleteOrgBoard(userPass) {
    cy.get(SidebarElements.boardAsideAnchore).eq(0).click();
    cy.get(ProjectMenuElements.configOrgLi).click();
    cy.get(ProjectMenuElements.deleteOrgButton).eq(4).click();
    cy.get(DialogModalElements.passwordConfirmInput).type(userPass);
    cy.get(DialogModalElements.yesButton).click();
  }
}

export default Org;
