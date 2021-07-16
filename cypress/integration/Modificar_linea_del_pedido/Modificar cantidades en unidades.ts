import { Dado, Cuando, Entonces, Antes, Y } from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(/^un producto que se seleccionó del pedido$/, () => {
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
        cy.get('[data-cy=cantidad-producto-unidades]').type('5{enter}');
    });
});
Cuando(/^se cambia la cantidad en las unidades$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').clear().type('10{enter}');
    });
});
Entonces(/^el sistema modifica el pedido$/, () => {

});
Y(/^actualiza los detalles del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(`[data-cy=total-unidades-pedido]`).should('have.text', '10');
    });
});
Y(/^totales del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=total-monto-pedido]').should('have.text', '$ 1050.00');
    });
});