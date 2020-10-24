describe("Vistors can choose UI language", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });
    cy.visit("/");
  });
  it("by choosing language to swedish", () => {
    cy.get("[data-cy='change-language']").click();
    cy.get("div[role='option']").contains("Svenska").click();
    cy.get('[href="/articles/sports"]').should("contain", "");
    cy.get('[href="/articles/politics"]').should("contain", "");
    cy.get('[href="/articles/news"]').should("contain", "");
    cy.get("[data-cy='header-login']").should("contain", "");
    cy.get("[data-cy='change-language']").should("contain", "");
  });
});
