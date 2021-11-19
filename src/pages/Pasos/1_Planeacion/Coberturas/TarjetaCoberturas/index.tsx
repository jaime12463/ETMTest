import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {FlechaAbajoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {useObtenerVisitaActual} from 'redux/hooks';
import {InputsKeysFormTomaDePedido} from 'models';
import theme from 'theme';
import TarjetaTomaPedido from 'components/UI/TarjetaTomaPedido';

const ButtonStyled = styled(Button)(() => ({
	border: '1.5px solid #651C32',
	boxSizing: 'border-box',
	borderRadius: '20px',
	minHeight: '10px',
	height: '16px',
	textTransform: 'none',
	'&:hover': {
		background: 'none',
	},
}));

interface Props {
	id: string;
	expandido: string | boolean;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	grupo: string;
	codigosProductos: number[];
}

const TarjetaCoberturas: React.FC<Props> = ({
	id,
	expandido,
	setExpandido,
	grupo,
	codigosProductos,
}) => {
	const classes = useEstilos();
	const {t} = useTranslation();
	const visitaActual = useObtenerVisitaActual();
	const {venta} = visitaActual.pedidos;

	const coberturasAgregadas = venta.productos.filter((producto) => {
		for (const codigo of codigosProductos) {
			if (producto.codigoProducto === codigo) {
				return producto;
			}
		}
	});

	const productos = codigosProductos.map((codigoPoducto) =>
		useObtenerProductoPorCodigo(codigoPoducto)
	);

	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('unidades');
	const [focusId, setFocusId] = React.useState<number>(0);

	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
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
						border: '1px solid #D9D9D9',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					<Typography variant='subtitle3'>{grupo}</Typography>
					<Typography variant='subtitle3'>
						{coberturasAgregadas.length > 0
							? `${coberturasAgregadas.length} de ${codigosProductos.length} items`
							: `${codigosProductos.length} items`}
					</Typography>
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Box>
						{productos.map((producto, i) => {
							if (!producto)
								throw new Error(
									`El producto con el codigo} ${codigosProductos[i]} no existe`
								);
							return (
								<TarjetaTomaPedido
									key={producto.codigoProducto}
									producto={producto}
									stateFocusId={{focusId, setFocusId}}
									stateInputFocus={{inputFocus, setInputFocus}}
								/>
							);
						})}
					</Box>
				</Collapse>
				<Box
					padding={expandido === id ? '16px 14px' : '0 14px 12px 14px'}
					sx={{
						border: '1px solid #D9D9D9',
						borderTop: 'none',
						borderRadius: '0 0 4px 4px',
					}}
				>
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						onClick={manejadorExpandido({
							id: expandido === id ? false : id,
						})}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px' alignItems='center'>
								<Typography variant='caption' color='secondary'>
									{expandido === id
										? t('general.ocultarGrupo')
										: t('general.verGrupo')}
								</Typography>
								<Box
									className={clsx(classes.expand, {
										[classes.expandOpen]: expandido === id ? true : false,
									})}
									aria-expanded={expandido === id ? true : false}
									style={{padding: 0}}
								>
									<FlechaAbajoIcon width='10px' height='10px' />
								</Box>
							</Box>
						</CardActions>
					</ButtonStyled>
				</Box>
			</Box>
		</Card>
	);
};

export default TarjetaCoberturas;
