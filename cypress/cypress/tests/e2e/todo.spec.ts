/// <reference types="cypress" />

describe("Login flow", () => {
  it("should login with Admin credencials", () => {

    cy.visit("http://localhost:3030");
    cy.wait(1000);
    cy.get('[data-testid="add-input"]').type("test");
    cy.get('[data-testid="add-select-type"]').click();
    cy.get('[data-testid="add-select-type-content"]').within(() => {
      cy.contains("Work").click();
    });
    cy.get('[data-testid="add-select-status"]').click();
    cy.get('[data-testid="add-select-status-content"]').within(() => {
      cy.contains("In Progress").click();
    });

    cy.get('[data-testid="add-button"]').click();

    cy.get('.task-table-row').contains("test");
  });
});
