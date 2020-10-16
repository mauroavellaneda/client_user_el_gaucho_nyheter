Cypress.Commands.add("login", () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@mail.com`,
    },
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@mail.com`,
    },
  });
  cy.visit("/");
  cy.get("[data-cy='login']").click()
  cy.get("[data-cy='login-form']").within(() => {
    cy.get("[data-cy='email']").type("user@mail.com");
    cy.get("[data-cy='password']").type("password");
    cy.get("[data-cy='submit']").click();
  });
});
