import { Dado, Cuando, Entonces } from '../../pasos';

beforeEach(() => {
    cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});

Dado(/^que el cliente tiene configurado las unidadesMaximasVenta menor$/, () => {
    cy.datosDB({cantidadMaximaUnidades: 100});
});
Cuando(/^se ingresa cantidad menor$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.wait('@data');
        cy.wait('@dataConfig');
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').type('99{enter}');
    });
});
Cuando(/^se ingresa cantidad igual$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.wait('@data');
        cy.wait('@dataConfig');
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').type('100{enter}');
    });
});
Entonces(/^el sistema continuará con el ingreso del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-es-mayor]').should('not.exist');
    });
});