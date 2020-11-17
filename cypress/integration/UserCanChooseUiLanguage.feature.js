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
    cy.get("[data-cy='sports']").should("contain", "Deportes");
    cy.get("[data-cy='politics']").should("contain", "Politica");
    cy.get("[data-cy='news']").should("contain", "Ultimas Noticias");
    cy.get("[data-cy='login']").should("contain", "Inicia sesion");
  });
  it("by choosing language to swedish", () => {
    cy.get("[data-cy='change-language']").click();
    cy.get("div[role='option']").contains("Swedish").click();
    cy.get("[data-cy='sports']").should("contain", "Sporter");
    cy.get("[data-cy='home']").should("contain", "Hem");
    cy.get("[data-cy='politics']").should("contain", "Politik");
    cy.get("[data-cy='news']").should("contain", "Nyheter");
    cy.get("[data-cy='politics']").should("not.contain", "Politica");
    cy.get("[data-cy='login']").should("contain", "Logga in");
  });
  it("by choosing language to english", () => {
    cy.get("[data-cy='change-language']").click();
    cy.get("div[role='option']").contains("English").click();
    cy.get("[data-cy='sports']").should("contain", "Sports");
    cy.get("[data-cy='politics']").should("not.contain", "Sports");
    cy.get("[data-cy='local-news']").should("not.contain", "Noticias Locales");
    cy.get("[data-cy='login']").should("contain", "Login");
  });
});
