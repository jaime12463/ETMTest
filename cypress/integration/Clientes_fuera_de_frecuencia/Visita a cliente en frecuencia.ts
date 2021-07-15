import { Dado, Cuando, Entonces, Antes} from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(`que por configuración la frecuencia de venta {string}`, (esFrecuenciaAbierta) => {
    cy.datosDB({});
    cy.datosConfiguracionDB({esFrecuenciaAbierta: esFrecuenciaAbierta});
    cy.wait('@data');
    cy.wait('@dataConfig');
});
Cuando(/^ingreso un cliente que tiene una visita planificada para la fecha actual$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
    });
});
Entonces(/^el sistema habilita el ingreso del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => { 
        cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
        cy.get('[data-cy=info]').should('exist');
    });
});