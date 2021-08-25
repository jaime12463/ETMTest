import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se registraron productos en el pedido', (datatable) => {
    datatable.hashes().forEach((element: any) => {
		cy.agregarProducto({
			codigoProducto: element.codigoProducto,
			unidades: element.cantidadUnidades,
			subUnidades: element.cantidadSubunidades,
		});
        if(element.condicionPago == 'contado') {cy.get(`[data-cy=switch-cambiar-tipoPago-${element.codigoProducto}]`).click();}
    });
});

Cuando('se ingresa {int}', (unidades) => {
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades,
		subUnidades: 0,
	});
});

Entonces('el sistema calculará para cada Condición de Pago el Total de Unidades como la suma de Unidades, y el Total de Subunidades como la suma de las Subunidades', () => {});

Y('el Total Monto como unidades * precio con Impuesto de la Unidadad + Subunidades * precio con impuesto de la Subunidad, de los productos de la misma condición de pago', () => {});

Entonces(
	'el sistema mostrará los totales de {string} Unidades y {string} Subunidades para Contado',
	(totalUnidadesContado, totalSubunidadesContado) => {
		cy.get(`[data-cy=total-unidades-contado]`).should('have.text', `Unidades: ` + totalUnidadesContado)
		cy.get(`[data-cy=total-subunidades-contado]`).should('have.text', `SubUnidades: ` + totalSubunidadesContado)
	}
);

Y('los totales de {string} Unidades y {string} Subunidades para Crédito',
	(totalUnidadesCredito, totalSubunidadesCredito) => {
		cy.get(`[data-cy=total-unidades-credito]`).should('contains.text', totalUnidadesCredito)
		cy.get(`[data-cy=total-subunidades-credito]`).should('contains.text', totalSubunidadesCredito)
	}
);

Y('los montos de {string} para Contado y {string} para Crédito',
	(totalMontoContado, totalMontoCredito) => {
		cy.get(`[data-cy=total-credito]`).should('contains.text', totalMontoCredito)
		cy.get(`[data-cy=total-contado]`).should('contains.text', totalMontoContado)
	}
);
