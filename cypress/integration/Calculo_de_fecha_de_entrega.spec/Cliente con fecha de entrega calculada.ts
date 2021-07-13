import { Dado, Cuando, Entonces, Y } from '../../pasos';

beforeEach(() => {
    cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
    cy.visit('/');
    cy.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
    });
});

Dado(/^que se ingresó un cliente para tomarle un pedido$/, () => {
    cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
    cy.datosDB({});
});
Cuando(/^tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.wait('@data');
        cy.wait('@dataConfig');
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
    });
});
Entonces(/^el sistema habilitará el ingreso del pedido$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(`[data-cy=no-fecha-programada]`).should('not.exist');
        cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
    });        
});
Y(/^mostrará la fecha de entrega$/, () => {
    cy.fixture('pagesElements').then((element) => {    
        cy.get(`[data-cy=fechaEntrega]`).should('exist');
    });   
});