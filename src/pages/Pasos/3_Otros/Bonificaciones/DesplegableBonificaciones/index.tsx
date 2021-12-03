import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import theme from 'theme';
import {CheckRedondoIcon, FlechaAbajoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import useEstilos from './useEstilos';
import CustomSelect from 'components/UI/CustomSelect';
import TarjetaBonificacion from '../TarjetaBonificacion';

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
}

const DesplegableBonificaciones: React.FC<Props> = ({
	id,
	expandido,
	setExpandido,
}) => {
	const {t} = useTranslation();
	const classes = useEstilos();
	const [opciones, setOpciones] = React.useState<string>('Seleccione un grupo');

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
					align-items='center'
					borderRadius='4px 4px 0 0'
					color={expandido === id ? '#fff' : '#000'}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					padding={expandido === id ? '12px 14px 18px 14px' : '12px 14px'}
					sx={{
						background:
							expandido === id ? theme.palette.secondary.light : 'none',
						border: '1px solid #D9D9D9',
						borderBottom: 'none',
						transition: 'all 0.3s ease-in-out',
					}}
				>
					{false && (
						<Box display='flex' justifyContent='end'>
							<CheckRedondoIcon
								height='17px'
								width='17px'
								fill={theme.palette.success.main}
							/>
						</Box>
					)}
					<Typography variant='subtitle3'>TODO TITULO</Typography>
				</Box>
				<Collapse in={expandido === id} timeout='auto' unmountOnExit>
					<Box
						border='1px solid #D9D9D9'
						borderBottom='none'
						borderTop='none'
						padding='10px 0'
					>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='8px'
							padding='0 14px'
						>
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								Grupos
							</Typography>
							<Typography variant='subtitle3' fontFamily='Open Sans'>
								Aplicación Máxima
							</Typography>
						</Box>
						<Box marginBottom='10px' padding='0 14px'>
							<CustomSelect
								opcionSeleccionada={opciones}
								opciones={[
									'Grupo 1',
									'Grupo 2',
									'Grupo 3',
									'Grupo 4',
									'Grupo 5',
								]}
								setOpcion={setOpciones}
								dataCy='select-bonificaciones'
							/>
						</Box>
						<Typography
							fontFamily='Open Sans'
							fontSize='12px'
							fontWeight='700'
							padding='0 14px'
							marginBottom='10px'
						>
							Beneficios
						</Typography>
						<Divider variant='fullWidth' />
						{true && <TarjetaBonificacion />}
						<Divider variant='fullWidth' />
					</Box>
				</Collapse>
				<Box
					padding={
						expandido === id ? '10px 14px 12px 14px' : '0 14px 12px 14px'
					}
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
										? t('general.ocultarDetalle')
										: t('general.verDetalle')}
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

export default DesplegableBonificaciones;
