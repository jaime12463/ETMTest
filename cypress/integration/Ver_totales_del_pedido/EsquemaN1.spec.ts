// import { Dado, Cuando, Entonces, Antes, Y } from '../../pasos';

// Antes(() => {
//     cy.visit('/');
//     cy.on('uncaught:exception', (err) => {
//         console.log(err);
//         return false;
//     });
// });
// Dado(`el precio de las unidades es $ {string}`, (precioConImpuestoUnidad) => {
//     cy.datosDB({
//         precioConImpuestoUnidad: Number(precioConImpuestoUnidad),
//         precioConImpuestoSubunidad: 10,
//     });
// });
// Y(`me encuentro en la ventana de un nuevo pedido`, () => {
//     cy.datosConfiguracionDB({});    
//     cy.wait('@data');
//     cy.wait('@dataConfig');
//     cy.fixture('pagesElements').then((element) => {
//         cy.get(element.splash.name).should('contain', element.splash.value);
//         cy.get(element.splash.logoBox).click();
//         cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
//         cy.get(`[data-cy=boton-crearPedidoAlClienteActual]`).should('exist');
//         cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
//         cy.get(`[data-cy=producto-tabla-0]`).should('exist');
//         cy.get('[data-cy=producto-tabla-0]').click();
//     });        
// });
// Cuando(`se ingresan {string} unidades a un producto en el pedido`, (unidadesIngresadas) => {
//     cy.fixture('pagesElements').then((element) => {
//         cy.get('[data-cy=cantidad-producto-unidades]').type(`${unidadesIngresadas}{enter}`);
//         cy.get(`[data-cy=total-unidades-pedido]`).should('have.text', `${unidadesIngresadas}`);
//         cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '0');
//     });
// });
// Entonces(`el sistema mostrará el resultado {string}`, (resultado) => {
//     cy.fixture('pagesElements').then((element) => {
//         cy.get('[data-cy=total-monto-pedido]').should('have.text', `$ ${resultado}`);
//     });
// });



import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se registraron productos en el pedido', (datatable) => {
    datatable.hashes().forEach((element: any) => {
        // cy.agregarProducto({
        //     codigoProducto: element.codigoProducto,
        //     unidades,
        //     subUnidades: 0,
        // });
        
		cy.get(`[data-cy=codigo-producto-a-buscar]`).type(`${element.codigoProducto}{enter}`);
		cy.get(`[data-cy=cantidad-producto-unidades]`).type(`${element.totalUnidades}{enter}{enter}`);
        // cy.get(`[data-cy=switch-cambiar-tipoPago${element.codigoProducto}]`).click();
        if(element.condicionPago == 'contado') {cy.get(`[data-cy=switch-cambiar-tipoPago-${element.codigoProducto}]`).click();}
		// cy.get(`[data-cy=cantidad-producto-subUnidades]`).type(
		// 	`${subUnidades}{enter}`
		// );
    });
});

Cuando('se ingresa {int}', (unidades) => {
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades,
		subUnidades: 0,
	});
});

Y('es mayor a la cantidad máxima de unidades', () => {});

Entonces(
	'el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo',
	() => {
		cy.get('[data-cy=cantidad-es-mayor]').should('exist');
	}
);
