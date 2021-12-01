import {Dado, Cuando, Entonces, Y} from '../../pasos';

Y('quiero ver el detalle de una iniciativa pendiente', () => {
	
});


Y('status sin valor, _nombreActividadPlan, _descripcionIniciativa, _finVigenciaIniciativa', () => {
	//el status debe ser Pendiente.
	cy.get('[data-cy=iniciativa-estatus-1]').should('be.visible');
	cy.get('[data-cy=iniciativa-planDeActividades-1]').should('be.visible');
	cy.get('[data-cy=iniciativa-descripcion-1]').should('be.visible');
	cy.get('[data-cy=iniciativa-vigencia-1]').should('be.visible');
});


Y('los valores iniciales de cantidad de _unidadVentaIniciativa y _subunidadVentaIniciativa', () => {
	cy.get('#unidades_producto').should('not.have.value', ''); //No debe ser vacio
	cy.get('#subUnidades_producto').should('not.have.value', ''); //No debe ser vacio
});