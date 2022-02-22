import {Cuando, Dado, Entonces, Y} from '../../pasos';

Cuando('se muestra la pantalla de promociones', () => {
	cy.navegarPageInicio('2022-02-01');
    cy.wait(5000);
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');
    cy.avanzarPasoSiguiente();
	cy.expandirTomaPedido();
	cy.agregarProducto({
		codigoProducto: 420,
		unidades: 7,
		subUnidades: 2,
	});
	cy.agregarProducto({
		codigoProducto: 400,
		unidades: 10,
	});
	cy.get('#switch-cambiar-tipoPago-400').click();
    cy.get('[data-cy=botonPromocionesOnGoing]').click();
	
	cy.get('[data-cy=pantalla-promociones]').should('be.visible');
});

Entonces('el sistema mostrará la sección de condición de pago crédito con la lista de promociones que cumplen requisito a crédito', () => {
	cy.get('[data-cy=Promociones-Credito]').should('be.visible');
});

Y('mostrará la sección de condición de pago contado con la lista de promociones que cumplen requisito a contado', () => {
	cy.get('[data-cy=Promociones-Contado]').should('be.visible');
});

Y('mostrará la sección de promociones que no cubren el requisito', () => {
	cy.get('[data-cy=No-aplicables]').should('be.visible');
});

Y('mostrará el control para restabelcer promociones para cada sección de condición de pago', () => {
	cy.get('[data-cy=boton-restablecer-credito]').should('be.visible');
	cy.get('[data-cy=boton-restablecer-contado]').should('be.visible');
});

