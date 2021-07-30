import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components/UI';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
} from '@material-ui/core';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import useEstilos from './useEstilos';
import {Celda} from 'components/UI/Table/Celda';
import { TConsolidadoImplicitos } from 'models';
import { useObtenerConsolidacionImplicitos } from './hooks';
import { ListadoEnvasesRetornables } from './components';

const EnvasesRetornables: React.FC = () => {
	const estilos = useEstilos();
	const {t} = useTranslation();
	const {productosPedido} = useAppSelector(selectPedidoActual);
	const obtenerConsolidacionImplicitos = useObtenerConsolidacionImplicitos();
	const consolidacionImplicitos: TConsolidadoImplicitos[] = obtenerConsolidacionImplicitos(productosPedido);

	return (
		<Estructura
			titulo={t('titulos.envases')}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>
				<ListadoEnvasesRetornables />
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default EnvasesRetornables;
