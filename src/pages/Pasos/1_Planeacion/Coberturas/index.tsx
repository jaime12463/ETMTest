import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DesplegableCoberturas from './DesplegableCoberturas';
import useEstilos from './useEstilos';
import {useObtenerCoberturas} from 'hooks';
import {AvisoIcon, ReiniciarIcon} from 'assests/iconos';
import {TProductoPedido} from 'models';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {
	agregarCoberturasEjecutadas,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import Modal from 'components/UI/Modal';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

interface Props {
	coberturasAgregadas: TProductoPedido[];
}

const Coberturas: React.FC<Props> = ({coberturasAgregadas}) => {
	const coberturas = useObtenerCoberturas();
	const visitaActual = useObtenerVisitaActual();
	const classes = useEstilos();
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const [expandido, setExpandido] = React.useState<string | boolean>(false);
	const [resetCoberturas, setResetCoberturas] = React.useState<boolean>(false);
	const [alerta, setAlerta] = React.useState<boolean>(false);

	const restablecerCantidades = () => {
		setResetCoberturas((prevState) => !prevState);
		coberturasAgregadas.map((cobertura) => {
			dispatch(
				borrarProductoDelPedidoActual({
					codigoProducto: cobertura.codigoProducto,
				})
			);
		});
		visitaActual.coberturasEjecutadas.map((coberutra) => {
			dispatch(
				agregarCoberturasEjecutadas({
					codigoProducto: coberutra.codigoProducto,
					unidades: 0,
					subUnidades: 0,
				})
			);
		});
	};

	return (
		<>
			<Modal
				alerta={alerta}
				setAlerta={setAlerta}
				contenidoMensaje={{
					titulo: '¿Restablecer cantidades a cero?',
					mensaje: '¿Está seguro que desea restablecer las cantidades a cero?',
					callbackAceptar: () => restablecerCantidades(),
					tituloBotonAceptar: 'Restablecer',
					tituloBotonCancelar: 'Cancelar',
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Stack marginTop='18px' spacing='10px'>
				{!visitaActual.pasoATomaPedido &&
					visitaActual.coberturasEjecutadas.some(
						(cobertura) => cobertura.unidades > 0 || cobertura.subUnidades > 0
					) && (
						<Box display='flex' justifyContent='end'>
							<Chip
								className={classes.chip}
								size='small'
								icon={<ReiniciarIcon width='7.5px' height='7.5px' />}
								label={
									<Typography
										variant='caption'
										fontFamily='Open Sans'
										color={theme.palette.secondary.main}
									>
										{t('general.restablecerCero')}
									</Typography>
								}
								onClick={() => setAlerta(true)}
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
		</>
	);
};

export default Coberturas;
