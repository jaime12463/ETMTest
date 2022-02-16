import {Cuando, Dado, Entonces, Y} from '../../pasos';

//Antecedentes
Dado('que se seleccionó el control de promociones ongoing', () => {
    cy.navegarPageInicio('2022-02-01');
    cy.wait(5000);
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');
    cy.avanzarPasoSiguiente();
	cy.expandirTomaPedido();
	//cy.get('#switch-cambiar-tipoPago-400').click();
	cy.agregarProducto({
		codigoProducto: 420,
		unidades: 7,
	});
	cy.agregarProducto({
		codigoProducto: 400,
		unidades: 10,
	});
    cy.get('[data-cy=botonPromocionesOnGoing]').click();
});
