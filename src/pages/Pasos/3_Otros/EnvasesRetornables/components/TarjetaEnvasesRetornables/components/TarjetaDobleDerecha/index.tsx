import {useEffect, useState} from 'react';
import {Box, Input, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {InputTipoPedido} from '../../..';
import {
	TRetornoEnvases,
	TConsolidadoImplicitos,
	TPrecioProducto,
	TTipoPedido,
} from 'models';
import {useMostrarAdvertenciaEnDialogo} from 'hooks';
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

interface Props {
	envase: TConsolidadoImplicitos;
	habilitaSubUnidadesPrestamo: boolean;
	habilitaSubUnidadesVenta: boolean;
	pedidosEnvasesHabilitados: TTipoPedido[];
	productoEnvase?: TPrecioProducto;
	productoPedido: any;
	stateTipoEnvases: any;
}

interface MapPedidos {
	[key: string]: TTipoPedido;
}

const TarjetaDobleDerecha: React.VFC<Props> = ({
	envase,
	habilitaSubUnidadesPrestamo,
	habilitaSubUnidadesVenta,
	pedidosEnvasesHabilitados,
	productoEnvase,
	productoPedido,
	stateTipoEnvases,
}) => {
	const {valoresEnvase, setValoresEnvase} = stateTipoEnvases;
	const {mostarDialogo, parametrosDialogo} = useMostrarAdvertenciaEnDialogo();
	const {t} = useTranslation();
	const {unidades, subUnidades} = envase;
	const unidadesIniciales = unidades;
	const subUnidadesIniciales = subUnidades;

	const [retorno, setRetorno] = useState<TRetornoEnvases>({
		unidades: unidadesIniciales,
		subUnidades: subUnidadesIniciales,
		retornoUnidades: unidadesIniciales,
		retornorSubUnidades: subUnidadesIniciales,
	});

	useEffect(() => {
		setRetorno({
			unidades: unidadesIniciales - productoPedido.unidades,
			subUnidades: subUnidadesIniciales - productoPedido.subUnidades,
			retornoUnidades: unidadesIniciales,
			retornorSubUnidades: subUnidadesIniciales,
		});
	}, [productoPedido]);

	const existeVentaEnvase = !!pedidosEnvasesHabilitados.find(
		(pedido) => pedido.codigo === 'ventaenvase'
	);

	return (
		<>
			{mostarDialogo && <Dialogo {...parametrosDialogo} />}
			<Box
				alignItems='center'
				display='grid'
				gap='8px 0'
				gridTemplateAreas={
					pedidosEnvasesHabilitados.length === 2
						? `"Vacio Caja Botella"
							"Retorno RUnidad RSubUnidad"
							"Venta VUnidad VSubUnidad"
							"Prestamo PUnidad PSubUnidad"`
						: existeVentaEnvase
						? `"Vacio Caja Botella"
							"Retorno RUnidad RSubUnidad"
							"Venta VUnidad VSubUnidad"`
						: `"Vacio Caja Botella"
							"Retorno RUnidad RSubUnidad"
							"Prestamo PUnidad PSubUnidad"`
				}
				gridTemplateColumns='1fr auto auto'
				gridTemplateRows={
					pedidosEnvasesHabilitados.length === 2
						? 'auto 1fr 1fr 1fr'
						: 'min-content min-content min-content'
				}
				height='100%'
				justifyItems='center'
				padding='12px 14px 12px 4px'
			>
				<CajaIcon
					height='14px'
					width='14px'
					style={{
						gridArea: 'Caja',
						marginBottom: '-4px',
						marginRight:
							habilitaSubUnidadesVenta || habilitaSubUnidadesPrestamo
								? '8px'
								: '0',
					}}
				/>
				{(habilitaSubUnidadesVenta || habilitaSubUnidadesPrestamo) && (
					<BotellaIcon
						height='12px'
						width='12px'
						style={{gridArea: 'Botella', marginBottom: '-4px'}}
					/>
				)}
				<Typography
					fontFamily='Open Sans'
					sx={{gridArea: 'Retorno'}}
					variant='caption'
					justifySelf='flex-end'
					marginRight='4px'
				>
					Retorno:
				</Typography>
				<InputStyled
					disableUnderline
					inputProps={{style: {textAlign: 'center'}}}
					readOnly
					sx={{
						gridArea: 'RUnidad',
						marginRight:
							habilitaSubUnidadesVenta || habilitaSubUnidadesPrestamo
								? '8px'
								: '0',
					}}
					value={retorno.unidades}
				/>
				{(habilitaSubUnidadesVenta || habilitaSubUnidadesPrestamo) && (
					<InputStyled
						disableUnderline
						inputProps={{style: {textAlign: 'center'}}}
						readOnly
						sx={{gridArea: 'RSubUnidad'}}
						value={retorno.subUnidades}
					/>
				)}
				{pedidosEnvasesHabilitados?.map((tipoPedido) => {
					return (
						<InputTipoPedido
							key={tipoPedido?.codigo}
							tipoPedido={tipoPedido}
							productoEnvase={productoEnvase}
							stateTipoEnvases={{valoresEnvase, setValoresEnvase}}
							stateRetorno={{retorno, setRetorno}}
							datosEnvase={envase}
							habilitaSubUnidadesVenta={habilitaSubUnidadesVenta}
							habilitaSubUnidadesPrestamo={habilitaSubUnidadesPrestamo}
						/>
					);
				})}
			</Box>
		</>
	);
};

export default TarjetaDobleDerecha;
