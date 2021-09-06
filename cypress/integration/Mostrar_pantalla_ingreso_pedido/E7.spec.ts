import {Dado, Y, Cuando, Entonces} from '../../pasos';

Dado('que se ingresó a la pantalla de pedido', () => {
	//Interceptar, llegar a registrar
});

Cuando('se selecciona un tipo de pedido que {string}', (habilitaPromocion) => {
	if (habilitaPromocion == 'true') {
		//TODO: Elegir tipo pedido
	} else {
	}
});

Entonces('el sistema {string} el acceso a las promo push', (visualizara) => {
	//TODO: Comprobar estados
});

Entonces('al carrito de compras', () => {
	//TODO: Comprobar estados
});
