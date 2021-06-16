describe("Primeros Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Validar pantalla de bienvenida", () => {
    cy.contains("Bienvenido");
  });

  it("Redireccionando a pantalla Ingreso Pedido", () => {
    cy.get("[data-cy=boton-splash]").click();

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should("include", "/ingresarpedido");
  });

  it("Validando escritura de cliente", () => {
    cy.get("[data-cy=boton-splash]").click();

    cy.get(`[data-cy=codigo-cliente]`)
      .type("1234")
      .should("have.value", "1234");
  });

  // it("Inicializando un pedido", () => {
  //   cy.get("[data-cy=boton-splash]").click();

  //   // stub utilizado para simular la peticion al servicio rest
  //   cy.intercept("/femsa/tomapedidos", {
  //     fixture: "datos/listaClientes.json",
  //   }).as("inter");
  //   // necesario para esperar la respuesta del stub en la parte superior
  //   cy.wait("@inter");

  //   cy.get(`[data-cy=codigo-cliente]`).type("120104325{enter}");
  //   cy.get("[data-cy=codigo-producto]").type("1860");
  //   cy.get("[data-cy=1860]").click();
  //   cy.get("[data-cy=cantidad-producto]").type("100{enter}");

  //   cy.get("[data-cy=cantidad-productos-pedido]").should("contain", "100");
  // });
});
