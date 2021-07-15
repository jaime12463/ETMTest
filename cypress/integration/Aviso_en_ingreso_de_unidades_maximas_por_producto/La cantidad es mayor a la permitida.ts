import { Dado, Cuando, Entonces, Antes } from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(/^que el cliente tiene configurado las unidadesMaximasVenta$/, () => {
    cy.datosDB({cantidadMaximaUnidades: 100});
    cy.datosConfiguracionDB({});
    cy.wait('@data');
    cy.wait('@dataConfig');

    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get(`[data-cy=info]`).should('exist');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get('[data-cy=producto-tabla-0]').click();
    });        
});
Cuando(`se ingresa {string}`, (cantidad) => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-producto-unidades]').type(`${cantidad}{enter}`);
    });
});
Entonces(/^el sistema mostrará el mensaje "La cantidad es mayor a 100" Desea continuar$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-es-mayor]').should('exist');
    });
});