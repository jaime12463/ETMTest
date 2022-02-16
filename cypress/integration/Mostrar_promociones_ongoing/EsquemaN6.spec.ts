import {Cuando, Dado, Entonces, Y} from '../../pasos';

Dado('que ingrese los productos 360 con 5 unidades a credito', () => {
	cy.navegarPageInicio('2022-02-01');
    cy.wait(5000);
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');
    cy.avanzarPasoSiguiente();
	cy.expandirTomaPedido();
	cy.agregarProducto({
		codigoProducto: 360,
		unidades: 5,
	});
});

Y('ingrese el producto 440 con 5 unidades a contado', () => {
	cy.agregarProducto({
		codigoProducto: 440,
		unidades: 5,
	});
	cy.get('#switch-cambiar-tipoPago-440').click();
});

Cuando('selecciono el control de promocionesOnGoing', () => {
    cy.get('[data-cy=botonPromocionesOnGoing]').click();
});

Entonces('deberia ver la promocion 685233 en contado y credito', () => {
    cy.get('[data-cy=promoOnGoing-ID-685233-credito]').should('be.visible');
    cy.get('[data-cy=promoOnGoing-ID-685233-contado]').should('be.visible');
});

Y('si le doy a aplicar a la promocion 685233 en contado, esta deberia aparecer un borde de color verde', () => {
    cy.get('[data-cy=promoOnGoing-Aplicar-685233-credito]').click();

    cy.get('[data-cy=promoOnGoing-Check-685233-credito] > path').should('exist');
    cy.get('[data-cy=promoOnGoing-Check-685233-contado] > path').should('not.exist');

    cy.get('[data-cy=promoOnGoing-Aplicar-685233-credito]').should('not.exist');
    cy.get('[data-cy=promoOnGoing-Aplicar-685233-contado]').should('be.visible');
});

Y('la promocion 685233 de credito deberia desaparecer.', () => {
    //Test falla
    cy.get('[data-cy=promoOnGoing-ID-685233-credito]').should('not.exist');
});