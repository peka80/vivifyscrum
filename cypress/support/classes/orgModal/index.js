import OrgModalElements from "../../elements/orgModalElements";
import OrgElements from "../../elements/orgElements";
import BordElements from "../../elements/bordElements";
import SidebarElements from "../../elements/sidebarElements";
import Utils from "../utils";

const utils = new Utils();

class OrgModal {
  assertNoOrgName() {
    cy.get(OrgElements.addOrgH2).click();

    cy.get(OrgModalElements.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[1]).not.to.have.class("active");
      });

    cy.get(OrgModalElements.nextButton).should("be.disabled");
    cy.get(OrgModalElements.closeButton).click();
  }

  createOrgNoAvatar(orgName, filename) {
    cy.get(OrgElements.addOrgH2).click();

    cy.get(OrgModalElements.orgNameInput).clear().type(orgName);

    cy.get(OrgModalElements.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[0]).to.have.class("active");
      });

    cy.get(OrgModalElements.nextButton).click();

    cy.get(OrgModalElements.dotPaginationUl)
      .children()
      .should("have.length", 2)
      .then(($dot) => {
        expect($dot[1]).to.have.class("active");
      });

    cy.get(OrgModalElements.orgTitleH2).should("have.text", orgName);

    cy.get(OrgModalElements.nextButton).click();
    cy.get(BordElements.boardModalOkButton).click();

    cy.get(SidebarElements.boardAsideAnchore)
      .should("exist")
      .and("contain", orgName);
  }
}

export default OrgModal;
