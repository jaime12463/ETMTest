describe("Primeros Tests", () => {
  it("Ingresando a la web", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Validar pantalla de bienvenida", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Bienvenido");
  });

  it("Redireccionando a pantalla Ingreso Pedido", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=boton-splash]").click();

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should("include", "/ingresarpedido");
  });

  it("Validando escritura de cliente", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=boton-splash]").click();

    // Get an input, type into it and verify that the value has been updated
    cy.get(`[data-cy=codigo-cliente]`)
      .type("1234")
      .should("have.value", "1234");
  });

  it("Inicializando un pedido", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=boton-splash]").click();
    cy.get(`[data-cy=codigo-cliente]`).type("120104325{enter}");
    cy.get("[data-cy=codigo-producto]").type("1860");
    cy.get("[data-cy=1860]").click();
    cy.get("[data-cy=cantidad-producto]").type("100{enter}");

    cy.get("[data-cy=cantidad-productos-pedido]").should("contain", "100");
  });
});
