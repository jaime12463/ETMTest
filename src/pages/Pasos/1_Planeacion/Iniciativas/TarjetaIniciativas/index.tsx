import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
	AgregarRedondoIcon,
	BotellaIcon,
	CajaIcon,
	CerrarIcon,
	CerrarRedondoIcon,
	CheckRedondoIcon,
	FlechaAbajoIcon,
	QuitarRellenoIcon,
} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import {useObtenerProductoPorCodigo} from 'hooks/useObtenerProductoPorCodigo';
import {
	useAppDispatch,
	useObtenerConfiguracion,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {cambiarEstadoIniciativa} from 'redux/features/visitaActual/visitaActualSlice';
import {TMotivosCancelacionIniciativas} from 'models';
import theme from 'theme';

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
	estado: 'pendiente' | 'ejecutada' | 'cancelada';
}

interface GetValuesProps {
	unidades: number;
	subUnidades: number;
	productoABuscar: string;
	tipoDePedido: string;
	catalogoMotivo: string;
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
	estado,
}) => {
	const classes = useEstilos({estado});
	const {t} = useTranslation();
	const producto = useObtenerProductoPorCodigo(codigo);
	const visitaActual = useObtenerVisitaActual();
	const {motivosCancelacionIniciativas} = useObtenerConfiguracion();

	const defaultValues: GetValuesProps = {
		unidades,
		subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};
	const [open, setOpen] = React.useState<boolean>(false);
	const [openMotivo, setOpenMotivo] = React.useState<boolean>(false);
	const [selectValue, setSelectValue] = React.useState<
		'pendiente' | 'ejecutada' | 'cancelada'
	>(estado);
	const [motivoValue, setMotivoValue] = React.useState<string>('');

	const [getValues, setGetValues] =
		React.useState<GetValuesProps>(defaultValues);

	const dispatch = useAppDispatch();
	const manejadorExpandido =
		({id}: any) =>
		(event: React.SyntheticEvent) => {
			setExpandido(id);
		};

	const handleSelectChange = (e: SelectChangeEvent<typeof selectValue>) => {
		switch (e.target.value) {
			case 'pendiente':
				setSelectValue('pendiente');
				dispatch(
					cambiarEstadoIniciativa({
						estado: 'pendiente',
						codigoIniciativa: Number(id),
					})
				);
				break;
			case 'ejecutada':
				setSelectValue('ejecutada');
				dispatch(
					cambiarEstadoIniciativa({
						estado: 'ejecutada',
						codigoIniciativa: Number(id),
					})
				);
				break;
			case 'cancelada':
				setSelectValue('cancelada');
				dispatch(
					cambiarEstadoIniciativa({
						estado: 'cancelada',
						codigoIniciativa: Number(id),
					})
				);
				break;
			default:
				break;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
		});
	};

	return (
		<Card
			className={classes.card}
			style={{padding: '12px 14px', boxShadow: 'none'}}
		>
			<Box>
				<Box display='flex' alignItems='start' marginBottom='12px' gap='40px'>
					<Typography variant='subtitle2'>{nombreIniciativa}</Typography>
					{estado === 'ejecutada' && (
						<Box>
							<CheckRedondoIcon fill={theme.palette.success.main} />
						</Box>
					)}
					{estado === 'cancelada' && (
						<Box>
							<CerrarRedondoIcon />
						</Box>
					)}
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Divider />
					<Stack spacing='12px' marginBottom='8px'>
						<Box display='flex' alignItems='center' marginTop='8px'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.estatus')}
							</Typography>
							<Box flex='3'>
								<Select
									className={classes.select}
									sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
									open={open}
									onClose={() => setOpen(false)}
									onOpen={() => setOpen(true)}
									value={selectValue}
									onChange={handleSelectChange}
								>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='pendiente'
									>
										{t('general.pendiente')}
									</MenuItem>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='ejecutada'
									>
										{t('general.ejecutada')}
									</MenuItem>
									<MenuItem
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										value='cancelada'
									>
										{t('general.cancelada')}
									</MenuItem>
								</Select>
							</Box>
						</Box>
						{estado === 'cancelada' && (
							<Box display='flex' alignItems='center' marginTop='8px'>
								<Typography variant='body3' fontFamily='Open Sans' flex='1'>
									{t('general.motivo')}
								</Typography>
								<Box flex='3'>
									<Select
										className={classes.select}
										sx={{fontSize: '10px', fontFamily: 'Open Sans'}}
										open={openMotivo}
										onClose={() => setOpenMotivo(false)}
										onOpen={() => setOpenMotivo(true)}
										value={motivoValue}
										onChange={(e) => setMotivoValue(e.target.value)}
									>
										{motivosCancelacionIniciativas?.map(
											(motivo: TMotivosCancelacionIniciativas) => (
												<MenuItem
													sx={{fontSize: '10px'}}
													key={motivo.codigo}
													value={motivo.descripcion}
												>
													{motivo.descripcion}
												</MenuItem>
											)
										)}
									</Select>
								</Box>
							</Box>
						)}
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.planDeActividades')}
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{planActividad}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.descripcion')}
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans' flex='3'>
								{descripcion}
							</Typography>
						</Box>
						<Box display='flex' gap='8px' alignItems='center'>
							<Typography variant='body3' fontFamily='Open Sans' flex='1'>
								{t('general.vigencia')}
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
							<Box display='flex' flexDirection='column'>
								<Typography variant='subtitle3'>
									{producto?.codigoProducto}
								</Typography>
								<Typography variant='subtitle3' noWrap width='150px'>
									{producto?.nombreProducto}
								</Typography>
								<Box
									display='flex'
									alignItems='center'
									marginTop='4px'
									gap='4px'
								>
									<CajaIcon height='18px' width='18px' />
									<Typography variant='caption'>
										x{producto?.presentacion}
									</Typography>
									<Typography variant='subtitle3'>
										${producto?.precioConImpuestoUnidad}
									</Typography>
									<BotellaIcon height='15px' width='15px' />
									<Typography variant='subtitle3'>
										${producto?.precioConImpuestoSubunidad}
									</Typography>
								</Box>
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
									gap='4px'
								>
									<CajaIcon width='18px' height='18px' />
									{estado === 'ejecutada' && (
										<IconButton
											size='small'
											value='-'
											name='unidades'
											sx={{padding: 0}}
											disabled={getValues.unidades <= unidades}
										>
											<QuitarRellenoIcon
												width='18px'
												height='18px'
												fill={
													getValues.unidades <= unidades ? '#D9D9D9' : '#2F000E'
												}
											/>
										</IconButton>
									)}
									<Input
										className={classes.input}
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
											className: classes.input,
										}}
										disableUnderline
										name='unidades'
										value={getValues.unidades}
										onChange={handleInputChange}
									/>
									{estado === 'ejecutada' && (
										<IconButton
											size='small'
											name='unidades'
											value='+'
											sx={{padding: 0}}
										>
											<AgregarRedondoIcon
												width='18px'
												height='18px'
												fill='#2F000E'
											/>
										</IconButton>
									)}
								</Box>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'
									gap='4px'
								>
									<BotellaIcon width='18px' height='18px' />
									{estado === 'ejecutada' && (
										<IconButton
											size='small'
											value='-'
											name='unidades'
											sx={{padding: 0}}
											disabled={getValues.subUnidades <= subUnidades}
										>
											<QuitarRellenoIcon
												width='18px'
												height='18px'
												fill={
													getValues.subUnidades <= subUnidades
														? '#D9D9D9'
														: '#2F000E'
												}
											/>
										</IconButton>
									)}
									<Input
										className={classes.input}
										inputProps={{
											style: {textAlign: 'center'},
											inputMode: 'numeric',
											className: classes.input,
										}}
										disableUnderline
										name='subUnidades'
										value={getValues.subUnidades}
										onChange={handleInputChange}
									/>
									{estado === 'ejecutada' && (
										<IconButton
											size='small'
											name='unidades'
											value='+'
											sx={{padding: 0}}
										>
											<AgregarRedondoIcon
												width='18px'
												height='18px'
												fill='#2F000E'
											/>
										</IconButton>
									)}
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
		</Card>
	);
};

export default TarjetaIniciativas;
