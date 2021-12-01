import {Dado, Cuando, Entonces, Y} from '../../pasos';

Y('quiero ver el detalle de una iniciativa cancelada', () => {
	cy.navegarPageInicio('2021-06-11');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');

	cy.get('[data-cy=expandir-Iniciativas]').click();
});


Y('status = "Cancelado", motivo = motivo registrado, _nombreActividadPlan, _descripcionIniciativa, _finVigenciaIniciativa', () => {

});


Y('los valores iniciales de cantidad de _unidadVentaIniciativa y _subunidadVentaIniciativa', () => {

});

Y('el borde de la iniciativa en color rojo y el ícono de cancelada', () => {

});


Y('la seleccion del motivo cargado con la _descripcioCancelacionIniciativa de _motivosCancelacionIniciativas ordenados alfabeticamente en forma ascendente', () => {

});