import React from 'react';
import Box from '@mui/material/Box';
import Informacion from './Informacion';
import Controles from './Controles';
import {
	GetValueProps,
	StateFocusID,
	TCondicicon,
	TProductoPedido,
	TStateInputFocus,
	TVisita,
} from 'models';
import CheckYPendiente from './CheckYPendiente';
import theme from 'theme';

interface Props {
	producto: TProductoPedido;
	condicion: TCondicicon;
	stateCatalogo: any;
	stateInputFocus: TStateInputFocus;
	statefocusId: StateFocusID;
	visitaActual: TVisita;
}

const TarjetaCanjes: React.FC<Props> = ({
	producto,
	condicion,
	stateCatalogo,
	stateInputFocus,
	statefocusId,
	visitaActual,
}) => {
	const defaultValues: GetValueProps = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: producto.catalogoMotivo,
	};

	const {catalogoMotivo} = stateCatalogo;
	const [bordeColor, setBordeColor] = React.useState<string>('#D9D9D9');
	const [getValues, setGetValues] =
		React.useState<GetValueProps>(defaultValues);

	React.useEffect(() => {
		if (
			(getValues.unidades > 0 && getValues.catalogoMotivo !== '') ||
			(getValues.subUnidades > 0 && getValues.catalogoMotivo !== '')
		) {
			return setBordeColor(theme.palette.success.main);
		}

		if (
			(getValues.unidades === 0 && getValues.catalogoMotivo !== '') ||
			(getValues.subUnidades === 0 && getValues.catalogoMotivo !== '')
		) {
			return setBordeColor(theme.palette.primary.main);
		}

		if (
			(getValues.unidades > 0 && getValues.catalogoMotivo === '') ||
			(getValues.subUnidades > 0 && getValues.catalogoMotivo === '')
		) {
			return setBordeColor(theme.palette.primary.main);
		}

		if (getValues.unidades === 0 && getValues.subUnidades === 0) {
			return setBordeColor('#D9D9D9');
		}
	}, [getValues.unidades, getValues.subUnidades, getValues.catalogoMotivo]);

	return (
		<Box minWidth={'100%'} display={'flex'} justifyContent={'flex-end'}>
			<Box border={`1px solid ${bordeColor}`} borderRadius='8px'>
				<CheckYPendiente
					producto={producto}
					getValues={getValues}
					catalogoMotivo={catalogoMotivo}
				/>
				<Box display='flex'>
					<Informacion
						producto={producto}
						condicion={condicion}
						stateCatalogo={stateCatalogo}
						stateInputFocus={stateInputFocus}
						statefocusId={statefocusId}
						getValues={getValues}
					/>
					<Controles
						producto={producto}
						stateInputFocus={stateInputFocus}
						statefocusId={statefocusId}
						stateCatalogo={stateCatalogo}
						getValues={getValues}
						setGetValues={setGetValues}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default TarjetaCanjes;
