import { Dado, Cuando, Entonces, Antes, Y } from '../../pasos';

Antes(() => {
    cy.visit('/');
    cy.on('uncaught:exception', (err) => {
        console.log(err);
        return false;
    });
});
Dado(`está habilitada la venta en subunidades`, () => {
    cy.datosConfiguracionDB({
        esVentaSubunidadesRuta: true
    });
});
Y(`el producto tiene habilitada la venta de subunidades`, () => {
    cy.datosDB({
        esVentaSubunidades: true
    });
});
Y(`el precio de las unidades es $ {string}`, (precioConImpuestoUnidad) => {
    cy.datosDB({
        precioConImpuestoUnidad: Number(precioConImpuestoUnidad)
    });
});
Y(`el precio de las subunidades es $ {string}`, (precioConImpuestoSubunidad) => {
    cy.datosDB({
        precioConImpuestoSubunidad: Number(precioConImpuestoSubunidad)
    });
    cy.wait('@data');
    cy.wait('@dataConfig');
    cy.fixture('pagesElements').then((element) => {
        cy.get(element.splash.name).should('contain', element.splash.value);
        cy.get(element.splash.logoBox).click();
        cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
        cy.get(`[data-cy=boton-crearPedidoAlClienteActual]`).should('exist');
        cy.get('[data-cy=boton-crearPedidoAlClienteActual]').click();
        cy.get(`[data-cy=producto-tabla-0]`).should('exist');
        cy.get('[data-cy=producto-tabla-0]').click();
    });        
});
Cuando(`se ingresan {string} unidades y {string} subunidades a un producto en el pedido`, (unidadesIngresadas, subunidadesIngresadas) => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=cantidad-producto-unidades]').type(`${unidadesIngresadas}`);
        cy.get('[data-cy=cantidad-producto-subUnidades]').type(`${subunidadesIngresadas}{enter}`);
        cy.get(`[data-cy=total-unidades-pedido]`).should('have.text', `${unidadesIngresadas}`);
        cy.get(`[data-cy=total-subUnidades-pedido]`).should('have.text', `${subunidadesIngresadas}`);
    });
});
Entonces(`el sistema mostrará el resultado {string}`, (resultado) => {
    cy.fixture('pagesElements').then((element) => {
        cy.get('[data-cy=total-monto-pedido]').should('have.text', `$ ${resultado}`);
    });
});
