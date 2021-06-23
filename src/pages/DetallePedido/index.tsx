import React from 'react';
import {useTranslation} from 'react-i18next';
import {
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

const DetallePedido: React.FC = () => {
	const estilos = useEstilos();
	const {t} = useTranslation();
	const {productosPedido} = useAppSelector(selectPedidoActual);

	return (
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
							<TableCell key={column} className={estilos.alignment}>
								{column}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{productosPedido.map((producto) => (
						<TableRow key={producto.codigoProducto}>
							<TableCell
								className={estilos.alignment}
								data-cy='detalle-codigo-producto'
							>
								{producto.codigoProducto}
							</TableCell>
							<TableCell
								className={estilos.alignment}
								data-cy='detalle-nombre-producto'
							>
								{producto.nombreProducto}
							</TableCell>
							<TableCell
								className={estilos.alignment}
								data-cy='detalle-unidades-producto'
							>
								{producto.unidades}
							</TableCell>
							<TableCell
								className={estilos.alignment}
								data-cy='detalle-subUnidades-producto'
							>
								{producto.subUnidades}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DetallePedido;
