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
							t('general.producto'),
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
					{productosPedido.map((product) => (
						<TableRow key={product.codigoProductoConNombre}>
							<TableCell className={estilos.alignment}>
								{product.codigoProductoConNombre}
							</TableCell>
							<TableCell className={estilos.alignment}>
								{product.unidades}
							</TableCell>
							<TableCell className={estilos.alignment}>
								{product.subUnidades}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DetallePedido;
