import { Dado, Cuando, Entonces } from '../../pasos';

Dado(/^que el cliente tiene configurado las unidadesMaximasVenta menor o igual$/, () => {
    cy.datosDB({cantidadMaximaUnidades: 100});
    cy.datosConfiguracionDB({});
    cy.wait('@data');
    cy.wait('@dataConfig');
});
Cuando(`se ingresa {string} menor o igual`, (cantidad) => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
        cy.get('[data-cy=cantidad-producto-unidades]').type(`${cantidad}{enter}`);
    });
});
Entonces(/^el sistema continuará con el ingreso del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-es-mayor]').should('not.exist');
    });
});