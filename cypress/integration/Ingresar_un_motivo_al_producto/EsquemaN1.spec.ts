import {Dado, Cuando, Entonces, Y} from '../../pasos';

Dado('que estoy en el ingreso del pedido y que se ingresó un código de producto', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades: 10,
		subUnidades: 2
	});
	cy.get('#select-cambiar-tipo-pedido').click();
	cy.get('[data-cy=select-cambiar-tipo-pedido-1]').click();
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades: 10,
		subUnidades: 2
	});
});

Y('el _tipoPedido en curso _requiereMotivo', () => {
	cy.get('#select-cambiar-catalogo-motivo').should('exist');
});

Cuando('se selecciona el motivo', () => {
	cy.get('#select-cambiar-catalogo-motivo').click();
	cy.get('[data-cy=select-cambiar-catalogo-motivo-0]').click();
});

Entonces(
	'el sistema registrará el motivo y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.',
	() => {

	
});
