import SidebarElements from "../../elements/sidebarElements";
import BordElements from "../../elements/bordElements";
import BoardModalElements from "../../elements/boardModalElements";
import HeaderElements from "../../elements/headerElements";
import ProjectMenuElements from "../../elements/projectMenuElements";
import DialogModalElements from "../../elements/dialogModalElements";

class BoardModal {
  openBoardModal() {
    cy.get(SidebarElements.boardAsideAnchore).eq(-1).click();
    cy.get(BordElements.addNewBoardSpan).eq(-1).click();
  }

  assertBoardNoName() {
    this.openBoardModal();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(1)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.nextButton).should("be.disabled");
    cy.get(BoardModalElements.closeBoardModalButton).click();
  }

  assertBoardType(boardName) {
    this.openBoardModal();
    cy.get(BoardModalElements.boardTitleInput).clear().type(boardName);
    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(2)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.nextButton).should("be.disabled");
    cy.get(BoardModalElements.closeBoardModalButton).click();
  }

  createScrumBoard(boardName) {
    this.openBoardModal();

    cy.get(BoardModalElements.boardTitleInput).clear().type(boardName);
    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(2)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.scrumSpan).click();
    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(3)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(3)
      .should("have.class", "active");

    cy.get(BoardModalElements.nextButton).click();

    cy.get(SidebarElements.boardLi)
      .should("be.visible")
      .and("contain", boardName);
    cy.get(HeaderElements.boardTitleH1)
      .should("be.visible")
      .and("contain", boardName);
  }

  createImportBoard(boardName) {
    this.openBoardModal();

    cy.get(BoardModalElements.boardTitleInput).clear().type(boardName);
    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(2)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.scrumSpan).click();
    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(3)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(4)
      .should("not.have.class", "active");

    cy.get(BoardModalElements.nextButton).click();

    cy.get(BoardModalElements.boardDotPagLi)
      .eq(4)
      .should("have.class", "active");

    cy.get(BoardModalElements.nextButton).click();

    cy.get(SidebarElements.boardLi)
      .should("be.visible")
      .and("contain", boardName);
    cy.get(HeaderElements.boardTitleH1)
      .should("be.visible")
      .and("contain", boardName);
  }

  assertEditNoName(nameBoard, nameValid) {
    this.createImportBoard(nameBoard);

    cy.get(ProjectMenuElements.boardConfgLi).click();
    cy.get(ProjectMenuElements.boardTitleInput).clear();

    cy.get(ProjectMenuElements.boardValidSpan)
      .eq(0)
      .should("be.visible")
      .and("contain", nameValid);

    cy.get(ProjectMenuElements.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  }

  assertEdit51CharName(nameBoard, name51, nameValid) {
    this.createImportBoard(nameBoard);

    cy.get(ProjectMenuElements.boardConfgLi).click();
    cy.get(ProjectMenuElements.boardTitleInput).clear().type(name51);

    cy.get(ProjectMenuElements.boardValidSpan)
      .eq(0)
      .should("be.visible")
      .and("contain", nameValid);

    cy.get(ProjectMenuElements.boardUpdateButton)
      .contains("Update")
      .then(($btn) => {
        expect($btn).to.have.css("background-color", "rgb(78, 174, 147)");
      });
  }

  assertEditNoCode(nameBoard, codeValid) {
    this.createImportBoard(nameBoard);

    cy.get(ProjectMenuElements.boardConfgLi).click();
    // cy.get(ProjectMenuElements.boardTitleInput).clear().type(data.nameBoard);
    cy.get(ProjectMenuElements.boardCodeInput).clear();

    cy.get(ProjectMenuElements.boardValidSpan)
      .eq(1)
      .should("be.visible")
      .and("contain", codeValid);

    cy.get(ProjectMenuElements.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  }

  assertNoCodeNoName(nameBoard, nameValid, codeValid) {
    this.createImportBoard(nameBoard);

    cy.get(ProjectMenuElements.boardConfgLi).click();
    cy.get(ProjectMenuElements.boardTitleInput).clear();
    cy.get(ProjectMenuElements.boardCodeInput).clear();

    cy.get(ProjectMenuElements.boardValidSpan)
      .should("have.length", 3)
      .then(($span) => {
        expect($span[0].innerText).to.eq(nameValid);
        expect($span[1].innerText).to.eq(codeValid);
      });

    cy.get(ProjectMenuElements.boardUpdateButton)
      .should("be.disabled")
      .and("have.css", "background-color", "rgb(204, 204, 204)");
  }

  editCreatedBoard(nameBoard, editName, addDescript) {
    this.createImportBoard(nameBoard);

    cy.get(ProjectMenuElements.boardConfgLi).click();
    cy.get(ProjectMenuElements.boardTitleInput).clear().type(editName);
    cy.get(ProjectMenuElements.boardDescriptTextarea).type(addDescript);
    cy.get(ProjectMenuElements.boardUpdateButton).click();

    cy.get(SidebarElements.boardLi)
      .should("be.visible")
      .and("contain", editName);

    cy.get(HeaderElements.boardTitleH1)
      .should("be.visible")
      .and("have.attr", "title", editName);
  }

  deleteBoard(nameBoard) {
    this.createImportBoard(nameBoard);

    cy.get(SidebarElements.boardAsideAnchore).eq(-1).click();
    cy.get(ProjectMenuElements.boardConfgLi).click();
    cy.get(ProjectMenuElements.deleteBoard).eq(3).click();
    cy.get(DialogModalElements.yesButton).click();

    cy.get(SidebarElements.boardLi).should("not.exist");
    cy.get(HeaderElements.boardTitleH1).should("not.exist");
  }
}

export default BoardModal;
