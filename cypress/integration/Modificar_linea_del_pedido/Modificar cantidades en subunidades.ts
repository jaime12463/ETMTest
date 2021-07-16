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
        cy.get('[data-cy=cantidad-producto-subUnidades]').type('5{enter}');
    });
});
Cuando(/^se cambia las cantidad en las subunidades a 2$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-subUnidades]').clear().type('2{enter}');
    });
});
Entonces(/^el sistema modifica el pedido$/, () => {

});
Y(/^actualiza los detalles del pedido con 2 subunidades$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '2');
    });
});
Y(/^totales del pedido a 20$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=total-monto-pedido]').should('have.text', '$ 20.00');
    });
});