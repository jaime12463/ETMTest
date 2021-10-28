import {Grid, Input, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {InputTipoPedido} from '../../..';
import caja from 'assests/iconos/caja.svg';
import botella from 'assests/iconos/botella.svg';
import {FunctionComponent, useState} from 'react';
import {TConsolidadoImplicitos, TPrecioProducto, TTipoPedido} from 'models';
import {useAgregarProductoAlPedidoActual} from '../../../../hooks/useAgregarProductoAlPedidoActual';
import {useMostrarAdvertenciaEnDialogo, useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';
import {Dialogo} from 'components/UI';
import {useObtenerVisitaActual} from 'redux/hooks';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	border: 'none',
	width: '28px',
	height: '22px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '12px',
	fontSize: '12px',
}));

type Props = {
	pedidosEnvasesHabilitados: (TTipoPedido | undefined)[];
	stateTipoEnvases: any;
	envase: TConsolidadoImplicitos;
	productoEnvase: TPrecioProducto | undefined;
};

const TarjetaDobleDerecha: FunctionComponent<Props> = (props) => {
	const {pedidosEnvasesHabilitados, stateTipoEnvases, envase, productoEnvase} =
		props;

	const {valoresEnvase, setValoresEnvase} = stateTipoEnvases;
	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual();

	const {mostrarAdvertenciaEnDialogo, mostarDialogo, parametrosDialogo} =
		useMostrarAdvertenciaEnDialogo();

	const {t} = useTranslation();

	const {unidades, subUnidades} = envase;

	const unidadesIniciales = unidades;
	const subUnidadesIniciales = subUnidades;

	const [retorno, setRetorno] = useState<{
		unidades: number;
		subUnidades: number;
	}>({
		unidades: unidadesIniciales,
		subUnidades: subUnidadesIniciales,
	});

	const mostrarAviso = useMostrarAviso();

	const cambioUnidadesPorTipoPedido = (
		unidadesIngresadas: number,
		tipoEnvase: string,
		totalUnidadesTiposEnvase: any,
		codigoTipoPedidoActual: string | undefined
	): boolean => {
		let unidadesPermitidas = false;

		let envaseActual = valoresEnvase.find(
			(envase: any) => envase.tipoEnvase === tipoEnvase
		);

		if (!Number.isNaN(unidadesIngresadas) && envaseActual && tipoEnvase)
			if (unidadesIngresadas <= retorno.unidades + envaseActual?.unidades) {
				setRetorno({
					...retorno,
					unidades: Number(
						unidadesIniciales -
							totalUnidadesTiposEnvase.unidades -
							unidadesIngresadas
					),
				});

				let newEnvases = valoresEnvase.filter(
					(envase: any) => envase.tipoEnvase !== tipoEnvase
				);

				newEnvases.push({
					tipoEnvase: tipoEnvase,
					unidades: Number(unidadesIngresadas),
					subUnidades: envaseActual.subUnidades,
				});

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					unidadesIngresadas,
					envaseActual.subUnidades,
					envase.tipoPago,
					codigoTipoPedidoActual
				);
			} else {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.cantidadSuperiorEnvases'),
				// 	'supera-cantidad-en-envases'
				// );

				mostrarAviso('error', t('advertencias.cantidadSuperiorEnvases'));
			}

		return unidadesPermitidas;
	};

	const cambioSubUnidadesPorTipoPedido = (
		subUnidadesIngresadas: number,
		tipoEnvase: string,
		totalSubUnidadesTiposEnvase: any,
		codigoTipoPedidoActual: string | undefined
	): boolean => {
		let unidadesPermitidas = false;

		let envaseActual = valoresEnvase.find(
			(envase: any) => envase.tipoEnvase === tipoEnvase
		);

		if (!Number.isNaN(subUnidadesIngresadas) && envaseActual && tipoEnvase)
			if (
				subUnidadesIngresadas <=
				retorno.subUnidades + envaseActual?.subUnidades
			) {
				console.log(subUnidadesIniciales);
				setRetorno({
					...retorno,
					subUnidades: Number(
						subUnidadesIniciales -
							totalSubUnidadesTiposEnvase.subUnidades -
							subUnidadesIngresadas
					),
				});

				let newEnvases = valoresEnvase.filter(
					(envase: any) => envase.tipoEnvase !== tipoEnvase
				);

				newEnvases.push({
					tipoEnvase: tipoEnvase,
					unidades: envaseActual.unidades,
					subUnidades: Number(subUnidadesIngresadas),
				});

				setValoresEnvase(newEnvases);

				unidadesPermitidas = true;

				agregarProductoAlPedidoActual(
					productoEnvase,
					envaseActual.unidades,
					Number(subUnidadesIngresadas),
					envase.tipoPago,
					codigoTipoPedidoActual
				);
			} else {
				// mostrarAdvertenciaEnDialogo(
				// 	t('advertencias.cantidadSuperiorEnvases'),
				// 	'supera-cantidad-en-envases'
				// );
				mostrarAviso('error', t('advertencias.cantidadSuperiorEnvases'));
			}

		return unidadesPermitidas;
	};

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Grid container p={1} spacing={1} maxWidth={'180px'} maxHeight={'125px'}>
				<Grid
					item
					display='flex'
					alignItems='center'
					justifyContent='flex-end'
					xs={12}
					ml={4}
				>
					<Grid
						item
						xs={4}
						display='flex'
						alignItems='center'
						justifyContent='flex-start'
						mr={-0.4}
					>
						<img style={{width: '19px'}} src={caja} alt='icono caja' />
					</Grid>
					<Grid
						item
						xs={5}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<img style={{width: '19px'}} src={botella} alt='icono botella' />
					</Grid>
				</Grid>
				<Grid
					item
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					xs={12}
				>
					<Grid item xs={4}>
						<Typography fontFamily='Open Sans' variant={'caption'}>
							Retorno:
						</Typography>
					</Grid>

					<Grid item xs={3}>
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							disableUnderline
							value={retorno.unidades}
							readOnly
						/>
					</Grid>

					<Grid item xs={3}>
						<InputStyled
							inputProps={{style: {textAlign: 'center'}}}
							disableUnderline
							value={retorno.subUnidades}
							readOnly
						/>
					</Grid>
				</Grid>

				{pedidosEnvasesHabilitados?.map((tipoPedido) => (
					<InputTipoPedido
						tipoPedido={tipoPedido}
						productoEnvase={productoEnvase}
						stateTipoEnvases={{valoresEnvase, setValoresEnvase}}
						stateRetorno={{retorno, setRetorno}}
						cambioUnidadesPorTipoPedido={cambioUnidadesPorTipoPedido}
						cambioSubUnidadesPorTipoPedido={cambioSubUnidadesPorTipoPedido}
					/>
				))}
			</Grid>
		</>
	);
};

export default TarjetaDobleDerecha;
