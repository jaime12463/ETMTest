import { TStateSubUnidadesEnvases } from "models";

export type Props = {
	subUnidadesIngresadas: number;
	subUnidadesIniciales: number;
	stateSubUnidadesRetorno: TStateSubUnidadesEnvases;
	stateSubUnidadesVenta: TStateSubUnidadesEnvases;
	stateSubUnidadesPrestamo: TStateSubUnidadesEnvases;
};

export const useCambioSubUnidadesPorVenta = (props: Props) => {
	const {
		subUnidadesIngresadas,
		subUnidadesIniciales,
		stateSubUnidadesRetorno,
		stateSubUnidadesVenta,
		stateSubUnidadesPrestamo,
	} = props;

	const subUnidadesRetorno = stateSubUnidadesRetorno.subUnidadesEnvases;
	const setSubUnidadesRetorno = stateSubUnidadesRetorno.setSubUnidadesEnvases;

	const subUnidadesVenta = stateSubUnidadesVenta.subUnidadesEnvases;
	const setSubUnidadesVenta = stateSubUnidadesVenta.setSubUnidadesEnvases;

	const subUnidadesPrestamo = stateSubUnidadesPrestamo.subUnidadesEnvases;
	const setSubUnidadesPrestamo = stateSubUnidadesPrestamo.setSubUnidadesEnvases; //xxx
	
	let subUnidadesPermitidas = false;

	const cambioSubUnidadesPorVenta = (): boolean => {
		if(subUnidadesIngresadas)
		{
			console.log("ingreso:", subUnidadesIngresadas);
			console.log("SubUnidadesIngresadas", subUnidadesIngresadas);
			console.log("SubunidadesRetorno", subUnidadesRetorno);
			console.log("SubunidadesVenta", subUnidadesVenta);

			if(subUnidadesIngresadas <= (subUnidadesRetorno + subUnidadesVenta))
			{
				setSubUnidadesRetorno((subUnidadesIniciales - subUnidadesPrestamo) - subUnidadesIngresadas);
				setSubUnidadesVenta(subUnidadesIngresadas);
				subUnidadesPermitidas = true;
			}		
		}

		//Si es falso
		//SACAR MENSAJE
		return subUnidadesPermitidas;
	};

	return cambioSubUnidadesPorVenta;
};
