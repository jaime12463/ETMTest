import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se realizó la venta {int} de un producto Promo Push {int}', (cantidadUnidades, codigoPromo) => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
    cy.agregarProducto({
		codigoProducto: codigoPromo,
		unidades: cantidadUnidades,
	});
});

Entonces('el sistema mostrará lo siguiente', () => {
	cy.get('[data-cy=listado-envases-retornables-0]').should('exist');
	cy.get('[data-cy=listado-envases-retornables-0] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("3");
	cy.get('[data-cy=listado-envases-retornables-0] > .MuiGrid-container > :nth-child(3) > .MuiBox-root > .MuiTypography-root').contains("9");

    cy.get('[data-cy=listado-envases-retornables-1]').should('exist');
	cy.get('[data-cy=listado-envases-retornables-1] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("3");
	cy.get('[data-cy=listado-envases-retornables-1] > .MuiGrid-container > :nth-child(3) > .MuiBox-root > .MuiTypography-root').contains("0");
});