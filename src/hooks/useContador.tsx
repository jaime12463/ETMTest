import React from 'react';

export interface Contador {
	actualizarContador: (valor: number) => void;
	contador: number;
	decrementar: (valor?: number) => void;
	estadoInicial: number;
	incrementar: (valor?: number) => void;
	reiniciar: () => void;
}

export const useContador = (estadoInicial = 0): Contador => {
	const [contador, setContador] = React.useState<number>(estadoInicial);

	const incrementar = (valor: number = 1) => {
		if (estadoInicial > 0) {
			if (contador + valor > estadoInicial) {
				return reiniciar();
			}
		}

		setContador((state) => state + valor);
	};

	const decrementar = (valor: number = 1) => {
		if (contador - valor <= 0) {
			setContador(0);
			return;
		}

		setContador((state) => state - valor);
	};

	const reiniciar = () => setContador(estadoInicial);

	const actualizarContador = (valor: number) => {
		if (estadoInicial - valor < 0) {
			setContador(0);
			return;
		}

		setContador(estadoInicial - valor);
	};

	return {
		contador,
		incrementar,
		decrementar,
		reiniciar,
		estadoInicial,
		actualizarContador,
	};
};
