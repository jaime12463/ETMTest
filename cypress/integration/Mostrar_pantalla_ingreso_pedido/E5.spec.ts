import {Dado, Y, Cuando, Entonces} from '../../pasos';

Dado(
	'el tipo de pedido seleccionado es de un tipo de pedido _esValorizado = true y _esCreditoBloqueado = false',
	() => {
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].informacionCrediticia.esCreditoBloqueado = false;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
		});
		cy.fixture('configuracion').then((configuracion) => {
			configuracion.configuraciones[0].tipoPedidos[0].esValorizado = true;
			cy.intercept('GET', '/femsa/configuracion', configuracion).as(
				'configuracion'
			);
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@datos');
		cy.wait('@configuracion');
		cy.oprimirBotonSplash();
	}
);

Cuando(
	'ingreso a registrar un pedido con un cliente en condición de pago crédito informal',
	() => {
		cy.ingresarCodigoCliente('HS003');
	}
);

Y('{string} es crédito Disponible mayor a cero', (estadoCredito) => {
    //TODO: Hay que jugar con el credito y contado productos
});

Y('{string} es Pedido máximo cumplido', (estadoPedidoMaximo) => {
    //TODO: Aca soluciono por medio de agregar productos?
});

Entonces(
	'el sistema mostrará {string}, {string} y {string}',
	(
		estadoPanelIngresoProducto,
		estadoEncendidoSwitch,
		estadoHabilitacionSwitch
    ) => {
        //TODO: Comprobar estados
    }
);
