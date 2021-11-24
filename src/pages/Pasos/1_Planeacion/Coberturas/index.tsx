import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DesplegableCoberturas from './DesplegableCoberturas';
import useEstilos from './useEstilos';
import {useObtenerCoberturas} from 'hooks';
import {ReiniciarIcon} from 'assests/iconos';
import {TProductoPedido} from 'models';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {borrarProductoDelPedidoActual} from 'redux/features/visitaActual/visitaActualSlice';

interface Props {
	coberturasAgregadas: TProductoPedido[];
}

const Coberturas: React.FC<Props> = ({coberturasAgregadas}) => {
	const coberturas = useObtenerCoberturas();
	const visitaActual = useObtenerVisitaActual();
	const classes = useEstilos();
	const dispatch = useAppDispatch();
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const [resetCoberturas, setResetCoberturas] = React.useState<boolean>(false);

	const restablecerCantidades = () => {
		setResetCoberturas((prevState) => !prevState);
		coberturasAgregadas.map((cobertura) => {
			dispatch(
				borrarProductoDelPedidoActual({
					codigoProducto: cobertura.codigoProducto,
				})
			);
		});
	};

	return (
		<Stack marginTop='18px' spacing='10px'>
			{!visitaActual.pasoATomaPedido && coberturasAgregadas.length > 0 && (
				<Box display='flex' justifyContent='end'>
					<Chip
						className={classes.chip}
						size='small'
						icon={<ReiniciarIcon width='7.5px' height='7.5px' />}
						label={
							<Typography variant='caption' fontFamily='Open Sans'>
								Restablecer cantidades a cero
							</Typography>
						}
						onClick={() => restablecerCantidades()}
					/>
				</Box>
			)}
			{coberturas?.map((cobertura) => {
				return (
					<DesplegableCoberturas
						key={cobertura.secuenciaGrupoCobertura}
						id={cobertura.secuenciaGrupoCobertura.toString()}
						expandido={expandido}
						setExpandido={setExpandido}
						grupo={cobertura.grupoCobertura}
						codigosProductos={cobertura.productosGrupoCobertura}
						resetCoberturas={resetCoberturas}
						setResetCoberturas={setResetCoberturas}
					/>
				);
			})}
		</Stack>
	);
};

export default Coberturas;
