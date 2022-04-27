import React from 'react';
import {Stack, Box, Typography} from '@mui/material';
import DesplegableCoberturas from './DesplegableCoberturas';
import {useObtenerCoberturas} from 'hooks';
import {AvisoIcon, ReiniciarIcon} from 'assests/iconos';
import {TProductoPedido} from 'models';
import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {
	agregarCoberturasEjecutadas,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {BotonSmall, Modal} from 'components/UI';
import {useTranslation} from 'react-i18next';
import theme from 'theme';

interface Props {
	coberturasAgregadas: TProductoPedido[];
}

export const Coberturas: React.VFC<Props> = ({coberturasAgregadas}) => {
	const coberturas = useObtenerCoberturas();
	const visitaActual = useObtenerVisitaActual();
	const configuracion = useObtenerConfiguracion();
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
					titulo: t('advertencias.reestablecerCoberturasTitulo'),
					mensaje: t('advertencias.reestablecerCoberturasDescripcion'),
					callbackAceptar: () => restablecerCantidades(),
					tituloBotonAceptar: t('general.aceptar'),
					tituloBotonCancelar: t('general.cancelar'),
					iconoMensaje: <AvisoIcon />,
				}}
			/>
			<Stack marginTop='18px' spacing='10px'>
				{!visitaActual.pasoATomaPedido &&
					visitaActual.coberturasEjecutadas.some(
						(cobertura) => cobertura.unidades > 0 || cobertura.subUnidades > 0
					) && (
						<Box display='flex' justifyContent='flex-end'>
							<BotonSmall
								onClick={() => setAlerta(true)}
								padding='4px 10px 4px 5px'
							>
								<ReiniciarIcon height={7.5} width={7.5} />
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color={theme.palette.secondary.main}
								>
									{t('general.restablecerCero')}
								</Typography>
							</BotonSmall>
						</Box>
					)}
				{coberturas
					?.slice(0, configuracion.maximoGrupoCoberturaAMostrar)
					.map((cobertura) => {
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
