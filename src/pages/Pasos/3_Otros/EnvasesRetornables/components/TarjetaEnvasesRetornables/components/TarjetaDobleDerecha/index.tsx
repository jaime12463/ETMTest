import {Grid, Input, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {InputTipoPedido} from '../../..';
import {FunctionComponent, useEffect, useState} from 'react';
import {TConsolidadoImplicitos, TPrecioProducto, TTipoPedido} from 'models';
import {useAgregarProductoAlPedidoActual} from '../../../../hooks/useAgregarProductoAlPedidoActual';
import {useMostrarAdvertenciaEnDialogo, useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';
import {Dialogo} from 'components/UI';
import {BotellaIcon, CajaIcon} from 'assests/iconos';

const InputStyled = styled(Input)(({theme}) => ({
	borderRadius: '4px',
	border: 'none',
	width: '28px',
	height: '22px',
	backgroundColor: `${theme.palette.greys.light}`,
	fontWeight: 600,
	lineHeight: '12px',
	fontSize: '12px',
}));

type Props = {
	pedidosEnvasesHabilitados: (TTipoPedido | undefined)[];
	stateTipoEnvases: any;
	envase: TConsolidadoImplicitos;
	productoEnvase: TPrecioProducto | undefined;
	productoPedido: any;
};

const TarjetaDobleDerecha: FunctionComponent<Props> = (props) => {
	const {
		pedidosEnvasesHabilitados,
		stateTipoEnvases,
		envase,
		productoEnvase,
		productoPedido,
	} = props;

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

	useEffect(() => {
		setRetorno({
			unidades: unidadesIniciales - productoPedido.unidades,
			subUnidades: subUnidadesIniciales - productoPedido.subUnidades,
		});
	}, [productoPedido]);

	const mostrarAviso = useMostrarAviso();

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
						<CajaIcon height='19px' width='19px' />
					</Grid>
					<Grid
						item
						xs={5}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<BotellaIcon height='19px' width='19px' />
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
						key={tipoPedido?.codigo}
						tipoPedido={tipoPedido}
						productoEnvase={productoEnvase}
						stateTipoEnvases={{valoresEnvase, setValoresEnvase}}
						stateRetorno={{retorno, setRetorno}}
						datosEnvase={envase}
					/>
				))}
			</Grid>
		</>
	);
};

export default TarjetaDobleDerecha;
