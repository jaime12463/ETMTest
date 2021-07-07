import React from 'react';
import {useTranslation} from 'react-i18next';
import {Estructura} from 'components';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import {useAppSelector} from 'redux/hooks';
import {selectPedidoActual} from 'redux/features/pedidoActual/pedidoActualSlice';
import useEstilos from './useEstilos';
import {Celda} from 'components/Table/Celda';

const DetallePedido: React.FC = () => {
	const estilos = useEstilos();
	const {t} = useTranslation();
	const {productosPedido} = useAppSelector(selectPedidoActual);

	return (
		<Estructura
			titulo={'titulos.ingresoPedido'}
			esConFechaHaciaAtras={true}
			esConLogoInferior={false}
		>
			<TableContainer className={estilos.container}>
				<Table stickyHeader aria-label='a dense table' size='small'>
					<TableHead>
						<TableRow>
							{[
								t('general.codigo'),
								t('general.nombre'),
								t('general.unidades'),
								t('general.subUnidades'),
							].map((column) => (
								<TableCell key={column} padding='none' align='left'>
									<Box my={1} mx={1}>
										{column}
									</Box>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{productosPedido.map((producto) => (
							<TableRow key={producto.codigoProducto} hover>
								<Celda
									estilos={estilos}
									width='15'
									align='left'
									dataCy='detalle-codigo-producto'
								>
									{producto.codigoProducto}
								</Celda>
								<Celda
									estilos={estilos}
									width='45'
									align='left'
									dataCy='detalle-nombre-producto'
									resumirTexto={true}
								>
									{producto.nombreProducto}
								</Celda>
								<Celda
									estilos={estilos}
									width='15'
									align='right'
									dataCy='detalle-unidades-producto'
								>
									{producto.unidades}
								</Celda>
								<Celda
									estilos={estilos}
									width='15'
									align='right'
									dataCy='detalle-subUnidades-producto'
								>
									{producto.subUnidades}
								</Celda>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Estructura>
	);
};

export default DetallePedido;
