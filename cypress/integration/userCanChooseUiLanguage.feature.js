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
  it("by choosing language to spanish", () => {
    cy.get("[data-cy='change-language']").click();
    cy.get("div[role='option']").contains("Spanish").click();
    cy.get('[href="/articles"]').should("contain", "Deportes");
    cy.get('[href="/articles/politica"]').should("contain", "Politik");
    cy.get('[href="/articles/Noticias Locales"]').should("contain", "Lokalla Nyheter");
    cy.get("[data-cy='login']").should("contain", "Inicia sesion");
  });
});
