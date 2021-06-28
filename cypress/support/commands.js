// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
	'configDB',
	({
		cliente,
		cantidadMaximaUnidades = 100,
		esVentaSubunidades = true,
		producto = 1860,
		presentacion = 12,
	}) => {
		const today = new Date();
		const tomorrow = new Date(today).setDate(new Date(today).getDate() + 1);
		cy.fixture('db').then((db) => {
			db.clientes[cliente].visitasPlanificadas[0].dia = today;
			db.clientes[cliente].fechasEntrega[0].fechaVisita = today;
			db.clientes[cliente].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[cliente].configuracionPedido.cantidadMaximaUnidades =
				cantidadMaximaUnidades;
			db.clientes[cliente].portafolio[0].esVentaSubunidades =
				esVentaSubunidades;
			db.productos[producto].presentacion = presentacion;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
	}
);

Cypress.Commands.add(
	'configuracionRuta',
	({esFrecuenciaAbierta, esVentaSubunidadesRuta = true}) => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esFrecuenciaAbierta = esFrecuenciaAbierta;
			data.configuraciones[0].esVentaSubunidadesRuta = esVentaSubunidadesRuta;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
	}
);
