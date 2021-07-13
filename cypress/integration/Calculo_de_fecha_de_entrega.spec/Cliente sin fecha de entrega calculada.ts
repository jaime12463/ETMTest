import { Dado, Cuando, Entonces, Y} from '../../pasos';
import {obtenerFechaFutura, obtenerFechaToday} from '../../support/commands';

beforeEach(() => {
    cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
    cy.visit('/');
    cy.on('uncaught:exception', (err, runnable) => {
        console.log(err);
        return false;
    });
});

Dado(/^que se ingresó un cliente para tomarle un pedido con fecha distinta$/, () => {
    cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
    const fechaActual = obtenerFechaToday();
    const fechaFuturoUno = obtenerFechaFutura(1);
    const fechaFuturoDos = obtenerFechaFutura(2);

    cy.log("fechaActual ->", fechaActual);
    cy.log("fechaFuturoUno ->", fechaFuturoUno);
    cy.log("fechaFuturoDos ->", fechaFuturoDos);

    cy.datosDB({
        codigoCliente: '234',
        fechasEntrega: [
            {fechaVisita: fechaFuturoUno, fechaEntrega: fechaFuturoDos},
        ],
        visitasPlanificadas: [{dia: fechaActual, secuencia: 3}],
    });
});
Cuando(/^no tiene una fecha de entrega calculada para día de visita igual a la fecha del dispositivo$/, () => {
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.wait('@data');
        cy.wait('@dataConfig');
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