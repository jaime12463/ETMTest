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

const EnvasesRetornables: React.FC = () => {
	const estilos = useEstilos();
	const {t} = useTranslation();
	const {productosPedido} = useAppSelector(selectPedidoActual);

	return (
		<Estructura
			titulo={'titulos.envases'}
			esConFechaHaciaAtras={true}
		>
			<Estructura.Cuerpo>
				<Grid
					container
					direction='row'
					alignItems='center'
					spacing={2}
					className={estilos.container}
				>
					<TableContainer className={estilos.container}>
						<Table stickyHeader aria-label='a dense table' size='small'>
							<TableHead>
								<TableRow>
									{[
										t('general.envase'),
										t('general.unidades'),
										t('general.subunidades'),
									].map((column) => (
										<TableCell key={column} padding='none' align='center'>
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
											width='45'
											align='center'
											dataCy='retornables-nombre-producto'
											resumirTexto={true}
										>
											{producto.codigoImplicito1}
											{producto.nombreImplicito1}
										</Celda>
										<Celda
											estilos={estilos}
											width='15'
											align='center'
											dataCy='retornables-unidades-producto'
										>
											{producto.unidades}
										</Celda>
										<Celda
											estilos={estilos}
											width='15'
											align='center'
											dataCy='retornables-subUnidades-producto'
										>
											{producto.subUnidades}
										</Celda>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Estructura.Cuerpo>
		</Estructura>
	);
};

export default EnvasesRetornables;
