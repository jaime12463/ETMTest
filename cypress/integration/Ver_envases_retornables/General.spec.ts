import {Dado, Cuando, Y} from '../../pasos';

//Escenarios compartidos
Cuando('quiero ver los envases retornables del pedido', () => {
    cy.oprimirBotonVerEnvases();
});