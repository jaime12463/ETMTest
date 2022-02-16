import {Cuando, Dado, Entonces, Y} from '../../pasos';

Cuando('se muestra la pantalla de promociones', () => {
	cy.get('[data-cy=pantalla-promociones]').should('be.visible');
});

Entonces('el sistema mostrará la sección de condición de pago crédito con la lista de promociones que cumplen requisito a crédito', () => {
	cy.get('[data-cy=Promociones-Credito]').should('be.visible');
});

Y('mostrará la sección de condición de pago contado con la lista de promociones que cumplen requisito a contado', () => {

});

Y('mostrará la sección de promociones que no cubren el requisito', () => {
	cy.get('[data-cy=No-aplicables]').should('be.visible');
});

Y('mostrará el control para restabelcer promociones para cada sección de condición de pago', () => {

});
