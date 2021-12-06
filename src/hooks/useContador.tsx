import React from 'react';

export const useContador = (estadoInicial = 0) => {
	const [contador, setContador] = React.useState<number>(estadoInicial);

	const incrementar = (valor: number = 1) => {
		if (estadoInicial > 0) {
			if (contador + valor > estadoInicial) {
				return reiniciar();
			}
		}

		setContador((prevContador) => prevContador + valor);
	};

	const decrementar = (valor: number = 1) => {
		if (contador - valor >= 0) {
			setContador((prevContador) => prevContador - valor);
		}
	};

	const reiniciar = () => setContador(estadoInicial);

	return {contador, incrementar, decrementar, reiniciar, estadoInicial};
};
