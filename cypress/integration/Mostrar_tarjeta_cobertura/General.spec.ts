import {Cuando, Entonces, Y} from '../../pasos';

//E1 - E2
Cuando('estamos en el paso 1 - planeación', () => {
    
});

Entonces('el sistema mostrará la tarjeta de coberturas con su título', () => {
    cy.get('[data-cy=titulo-Coberturas] > .MuiTypography-root').should('be.visible');
});
