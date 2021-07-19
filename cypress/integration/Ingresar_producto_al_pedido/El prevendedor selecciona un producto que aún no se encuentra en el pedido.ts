import { Dado, Cuando, Entonces, Antes, Y } from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(/^que el prevendedor ha tecleado un cliente$/, () => {
    cy.datosDB({});
    cy.datosConfiguracionDB({});
    cy.wait('@data');
    cy.wait('@dataConfig');
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
    });
});
Cuando(/^selecciona un producto del portafolio del cliente que no se encuentra en el pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=codigo-producto]').type('1860');
        cy.get('[data-cy=producto-tabla-0]').click();
    }); 
});
Entonces(/^el sistema habilita el ingreso del producto mostrando código de producto y cantidad de unidades en cero$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-producto-unidades]').should('have.value', ''); // Revisar
    });
});