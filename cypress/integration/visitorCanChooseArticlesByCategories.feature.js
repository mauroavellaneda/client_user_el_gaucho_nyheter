describe("Visitor can choose articles by categories", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/?category=news",
      response: "fixture:articles_news.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/?category=sports",
      response: "fixture:articles_sports.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/?category=politics",
      response: "fixture:articles_politics.json",
    });

    cy.visit("/");
  });
  context("Visitor can see categories", () => {
    it("visitor can see different categories in the header", () => {
      cy.get("[data-cy='home']").should("contain", "Home");
      cy.get("[data-cy='news']").should("contain", "News");
      cy.get("[data-cy='sports']").should("contain", "Sports");
      cy.get("[data-cy='politics']").should("contain", "Politics");
    });
  });

  context("successfully - News", () => {
    it("Visitor can see the articles in the News category", () => {
      cy.get("[data-cy='news']").click();
      cy.get("[data-cy='article-4']").within(() => {
        cy.contains("Amy Coney Barrett");
        cy.get("[data-cy='image']").should("be.visible")
      });
    });
  });
  context("successfully - Sports", () => {
    it("Visitor can see the articles in the News category", () => {
      cy.get("[data-cy='sports']").click();
      cy.get("[data-cy='article-2']").within(() => {
        cy.contains("Former F1 driver Jolyon Palmer");
        cy.get("[data-cy='image']").should("be.visible")
      });
    });
  });
  context("successfully - Politics", () => {
    it("Visitor can see the articles in the News category", () => {
      cy.get("[data-cy='politics']").click();
      cy.get("[data-cy='article-1']").within(() => {
        cy.contains("Brexit: Time for trade deal getting short, PM warns");
        cy.get("[data-cy='image']").should("be.visible")
      });
    });
  });
});
