import { Dado, Cuando, Entonces } from '../../pasos';

beforeEach(() => {
    cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});

Dado(/^que el cliente no tiene configurado las unidadesMaximasVenta$/, () => {
    cy.datosDB({cantidadMaximaUnidades: null});
});
Cuando(/^se ingresan las unidades del pedido del cliente$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.wait('@data');
        cy.wait('@dataConfig');
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').type('101{enter}');
    });
});
Entonces(/^el sistema no realizará validación de unidades ingresadas$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-es-mayor]').should('not.exist');
    });
});