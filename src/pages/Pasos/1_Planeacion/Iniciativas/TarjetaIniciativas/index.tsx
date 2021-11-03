import React from 'react';
import {createStyles, styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	FlechaAbajoIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/styles';
import useEstilos from './useEstilos';
import clsx from 'clsx';

const InputStyled = styled(Input)(({}) => ({
	backgroundColor: '#D9D9D9',
	borderRadius: '10px',
	color: 'rgba(0, 0, 0, 0.5)',
	fontSize: '12px',
	fontWeight: 600,
	height: '16px',
	lineHeight: '16px',
	pointerEvents: 'none',
	width: '82px',
}));

const GridStyled = styled(Grid)(({theme}) => ({
	display: 'flex',
}));

const ButtonStyled = styled(Button)(({theme}) => ({
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

const CardStyled = styled(Card)(({theme}) => ({
	border: '1.5px solid #D9D9D9',
	boxSizing: 'border-box',
	borderRadius: ' 8px',
	// minHeight: '124px',
	minWidth: '304px',
	boxShadow: 'none',
}));

// const useEstilos = makeStyles(() =>
// 	createStyles({
// 		expand: {
// 			transform: 'rotate(0deg)',
// 			padding: 0,
// 		},
// 		expandOpen: {
// 			transform: 'rotate(180deg)',
// 		},
// 		inactiva: {
// 			opacity: 0.6,
// 		},
// 		cardContent: {
// 			'&.MuiCardContent-root': {
// 				padding: 0,

// 				'&.MuiCardContent-root:last-child': {
// 					padding: 0,
// 				},
// 			},
// 		},
// 	})
// );

interface Props {
	expandido: boolean | string;
	setExpandido: React.Dispatch<React.SetStateAction<string | boolean>>;
	id: string;
	nombreIniciativa: string;
	planActividad: string;
	descripcion: string;
	fechaVencimiento: string;
	unidades: number;
	subUnidades: number;
	codigo: number;
}

const TarjetaIniciativas: React.FC<Props> = ({
	expandido,
	setExpandido,
	id,
	nombreIniciativa,
	planActividad,
	descripcion,
	fechaVencimiento,
	unidades,
	subUnidades,
	codigo,
}) => {
	const classes = useEstilos();
	const {t} = useTranslation();

	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandido(id);
		};

	return (
		<CardStyled style={{padding: '12px 14px'}}>
			<Box>
				<Box marginBottom='12px'>
					<Typography variant='subtitle2'>{nombreIniciativa}</Typography>
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Divider />
					<Stack spacing='12px' marginBottom='8px'>
						<Box marginTop='8px'>
							<Typography variant='body3' fontFamily='Open Sans'>
								Estatus
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								Plan de actividades
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{planActividad}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								Descripción
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{descripcion}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								Vigencia
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{fechaVencimiento}
							</Typography>
						</Box>
					</Stack>
					<Divider />
					<Box margin='8px 0'>
						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'
						>
							<Box>
								<Typography variant='subtitle3'>{codigo}</Typography>
							</Box>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='center'
								flexDirection='column'
								gap='12px'
							>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'
									gap='10px'
								>
									<CajaIcon width='18px' height='18px' />
									<InputStyled
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
										}}
										disableUnderline
										readOnly
										value={unidades}
									/>
								</Box>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'
									gap='10px'
								>
									<BotellaIcon width='18px' height='18px' />
									<InputStyled
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
										}}
										disableUnderline
										readOnly
										value={subUnidades}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
					<Divider />
				</Collapse>
				<Box marginTop='8px'>
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
									Ver detalle
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
		</CardStyled>
	);
};

export default TarjetaIniciativas;
