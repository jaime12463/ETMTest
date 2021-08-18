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
