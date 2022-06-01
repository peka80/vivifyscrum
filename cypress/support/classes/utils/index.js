class Utils {
  visitUrl(url) {
    cy.visit(url);
  }

  uploadFile(selector, file) {
    cy.get(selector).selectFile(file);
  }
}

export default Utils;
