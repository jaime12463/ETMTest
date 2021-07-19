import { Dado, Cuando, Entonces } from '../../pasos';

Dado(`que por configuracion la frecuencia de venta {string}`, (esFrecuenciaAbierta) => {
    cy.datosDB({codigoCliente: '120104325'});
    cy.datosConfiguracionDB({esFrecuenciaAbierta: esFrecuenciaAbierta});
    cy.wait('@data');
    cy.wait('@dataConfig');
});
Cuando(/^ingreso un cliente que no tiene una visita planificada para la fecha actual$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('120104325{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
    });
});
Entonces(`el sistema realiza {string}`, (Acción) => {
    cy.fixture('pagesElements').then((element) => { 
        if(Acción == "Habilita el ingreso del pedido")
        {
            cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
            cy.get('[data-cy=info]').should('exist');
        }
        else
        {
            cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
            cy.get('[data-cy=info]').should('exist');
        }
    });
});