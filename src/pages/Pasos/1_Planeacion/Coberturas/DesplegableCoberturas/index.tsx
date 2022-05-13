import React from 'react';
import {Card, Box, Typography, Collapse} from '@mui/material';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {useObtenerVisitaActual} from 'redux/hooks';
import {InputsKeysFormTomaDePedido} from 'models';
import theme from 'theme';
import {BotonSmall, TarjetaCoberturas} from 'components/UI';

interface Props {
	codigosProductos: number[];
	expandido: string | boolean;
	grupo: string;
	id: string;
	resetCoberturas: boolean;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	setResetCoberturas: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesplegableCoberturas: React.VFC<Props> = ({
	codigosProductos,
	expandido,
	grupo,
	id,
	resetCoberturas,
	setExpandido,
	setResetCoberturas,
}) => {
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const obtenerProductoPorCodigo = useObtenerProductoPorCodigo();

	const coberturasAgregadas = visitaActual.coberturasEjecutadas.filter(
		(producto) => {
			for (const codigo of codigosProductos) {
				if (producto.codigoProducto === codigo) {
					return producto;
				}
			}
		}
	);

	const productos = codigosProductos.map((codigoPoducto) =>
		obtenerProductoPorCodigo(codigoPoducto)
	);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('unidades');
	const [focusId, setFocusId] = React.useState<number>(0);

	const manejadorExpandido = (id: string | boolean) => {
		setExpandido(id);
	};

	return (
		<Card
			style={{
				boxShadow: 'none',
				overflow: 'visible',
			}}
		>
			<Box>
				<Box
					display='flex'
					align-items='center'
					justifyContent='space-between'
					padding={expandido === id ? '12px 14px 18px 14px' : '12px 14px'}
					borderRadius='4px 4px 0 0'
					color={expandido === id ? '#fff' : '#000'}
					sx={{
						background:
							expandido === id ? theme.palette.secondary.main : 'none',
						border:
							expandido !== id &&
							coberturasAgregadas.some(
								(cobertura) =>
									cobertura.unidades > 0 || cobertura.subUnidades > 0
							)
								? `1px solid ${theme.palette.success.main}`
								: '1px solid #D9D9D9',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Typography variant='subtitle3'>{grupo}</Typography>
					<Typography variant='subtitle3'>
						{coberturasAgregadas.some(
							(cobertura) => cobertura.unidades > 0 || cobertura.subUnidades > 0
						) ? (
							<Box alignItems='center' display='flex' gap='7px'>
								<Typography variant='subtitle3'>
									{`${
										coberturasAgregadas.filter(
											(cobertura) =>
												cobertura.unidades > 0 || cobertura.subUnidades > 0
										).length
									} de ${codigosProductos.length} Items`}
								</Typography>
								{expandido !== id && (
									<CheckRedondoIcon height={14} width={14} />
								)}
							</Box>
						) : (
							`${codigosProductos.length} Items`
						)}
					</Typography>
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Box>
						{productos.map((producto) => {
							if (producto)
								return (
									<TarjetaCoberturas
										key={producto.codigoProducto}
										producto={producto}
										stateFocusId={{focusId, setFocusId}}
										stateInputFocus={{inputFocus, setInputFocus}}
										resetCoberturas={resetCoberturas}
										setResetCoberturas={setResetCoberturas}
									/>
								);
						})}
					</Box>
				</Collapse>
				<Box
					padding={expandido === id ? '16px 14px' : '0 14px 12px 14px'}
					sx={{
						border:
							expandido !== id &&
							coberturasAgregadas.some(
								(cobertura) =>
									cobertura.unidades > 0 || cobertura.subUnidades > 0
							)
								? `1px solid ${theme.palette.success.main}`
								: '1px solid #D9D9D9',
						borderTop: 'none',
						borderRadius: '0 0 4px 4px',
					}}
				>
					<BotonSmall
						fullWidth
						onClick={() => manejadorExpandido(expandido === id ? false : id)}
					>
						<Typography
							fontFamily='Open Sans'
							variant='caption'
							color='secondary'
						>
							{expandido === id
								? t('general.ocultarGrupo')
								: t('general.verGrupo')}
						</Typography>

						<FlechaAbajoIcon
							height={10}
							style={{
								transition: 'transform 0.3s ease-in-out',
								transform:
									expandido === id ? 'rotateX(180deg)' : 'rotate(0deg)',
							}}
							width={10}
						/>
					</BotonSmall>
				</Box>
			</Box>
		</Card>
	);
};

export default DesplegableCoberturas;
