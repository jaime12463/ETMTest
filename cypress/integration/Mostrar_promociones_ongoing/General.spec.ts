import {Cuando, Dado, Entonces, Y} from '../../pasos';

//Antecedentes
Dado('que se seleccionó el control de promociones ongoing', () => {
    cy.navegarPageInicio('2022-02-01');
    cy.wait(5000);
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');
    cy.avanzarPasoSiguiente();
    cy.agregarProducto({
		codigoProducto: 1885,
		unidades: 10,
		subUnidades: 2
	});
    //cy.get('[data-cy=botonPromocionesOnGoing]').click();
});
