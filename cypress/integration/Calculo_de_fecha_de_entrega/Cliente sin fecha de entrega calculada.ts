import { Dado, Cuando, Entonces, Y} from '../../pasos';
import {obtenerFechaFutura, obtenerFechaToday} from '../../support/commands';

Dado(/^que se ingresó un cliente para tomarle un pedido con fecha distinta$/, () => {
    const fechaActual = obtenerFechaToday();
    const fechaFuturoUno = obtenerFechaFutura(1);
    const fechaFuturoDos = obtenerFechaFutura(2);
    cy.datosDB({
        codigoCliente: '234',
        fechasEntrega: [
            {fechaVisita: fechaFuturoUno, fechaEntrega: fechaFuturoDos},
        ],
        visitasPlanificadas: [{dia: fechaActual, secuencia: 3}],
    });
    cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
    cy.wait('@data');
    cy.wait('@dataConfig');
});
Cuando(/^no tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
    });
});
Entonces(/^el sistema mostrará el mensaje “El cliente no tiene fecha de entrega programada”$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(`[data-cy=no-fecha-programada]`).should('exist');
    });
});
Y(/^no mostrará información del cliente$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(`[data-cy=fechaEntrega]`).should('not.exist');
        cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
    });
});