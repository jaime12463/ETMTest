import { Dado, Cuando, Entonces, Antes, Y } from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(/^que se seleccionó un producto del pedido$/, () => {
    cy.datosDB({});
    cy.datosConfiguracionDB({});
    cy.wait('@data');
    cy.wait('@dataConfig');
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').type('10');
        cy.get('[data-cy=cantidad-producto-subUnidades]').type('2{enter}');
    });
});
Cuando(/^se ingresa cantidad 0 en unidades$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').clear().type('0');
    });
});
Y(/^se ingresa cantidad 0 en subunidades$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-producto-subUnidades]').clear().type('0{enter}');
    });
});
Entonces(/^el sistema eliminará el producto seleccionado del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(`[data-cy="tarjeta-pedido"]`).should('not.exist');
    });
});