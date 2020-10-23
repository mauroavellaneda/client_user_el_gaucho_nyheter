const stubLocation = require("../support/stubLocation");

describe("User can see news from current country", () => {
  context("when current location is Sweden", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles",
        response: "fixture:articles_index.json",
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/?location=Sweden",
        response: "fixture:local_news_sweden.json",
      });
      cy.visit("/", stubLocation({ latitude: 59.3501, longitude: 17.9658 }));
    });

    it("Visitor can see the articles in the Local News category", () => {
      cy.get("[data-cy='local-news']").click();
      cy.get("[data-cy='current-location']").should(
        "contain",
        "Local news from: Sweden"
      );
      cy.get("[data-cy='article-7']").within(() => {
        cy.contains("Osäkert kring Piteås match");
      });
    });
  });

  context("when current location is America", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles",
        response: "fixture:articles_index.json",
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/?location=America",
        response: "fixture:local_news_USA.json",
      });

      cy.visit(
        "/",
        stubLocation({ latitude: 40.73061, longitude: -73.935242 })
      );
    });

    it("Visitor can see the articles in the News category", () => {
      cy.get("[data-cy='local-news']").click({ force: true });
      cy.get("[data-cy='current-location']").should(
        "contain",
        "Local news from: United States of America"
      );
    });
    it("And read its content", () => {
      cy.get("[data-cy='article-9']").within(() => {
        cy.contains("Flush With Cash");
      });
    });
  });
});
