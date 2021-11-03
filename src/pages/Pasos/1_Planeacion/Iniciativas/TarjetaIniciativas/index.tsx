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
import {FlechaAbajoIcon} from 'assests/iconos';
import {formatearNumero} from 'utils/methods';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/styles';
import useEstilos from './useEstilos';
import clsx from 'clsx';
import theme from 'theme';

const InputStyled = styled(Input)(({}) => ({
	borderRadius: '10px',
	border: '1px solid #2F000E',
	height: '16px',
	width: '42px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '16px',
	fontSize: '12px',
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

const TarjetaIniciativas: React.FC = () => {
	const classes = useEstilos();
	const {t} = useTranslation();

	return (
		<CardStyled
			// sx={
			//   getValues.unidades > 0
			//     ? {border: '1.5px solid #00CF91'}
			//     : {border: '1.5px solid #D9D9D9'}
			// }
			style={{padding: '12px 14px'}}
		>
			<Box>
				<Typography variant='subtitle2'>
					Recupera share Sabores. Asegura cobertura de Fresca 600ml NR en este
					cliente con Sku 35438939
				</Typography>
				<Collapse
					// in={expandido === id}
					timeout='auto'
					unmountOnExit
				>
					<Stack>
						<Divider />
					</Stack>
				</Collapse>
				<Box marginTop='8px'>
					<ButtonStyled
						disableFocusRipple
						fullWidth
						disableRipple
						// onClick={manejadorExpandido({
						//   id: expandido === id ? false : id,
						// })}
					>
						<CardActions disableSpacing style={{padding: 0}}>
							<Box display='flex' gap='6px'>
								<Typography variant='caption' color='secondary'>
									Ver detalle
								</Typography>
								<IconButton
									// className={clsx(classes.expand, {
									// 	[classes.expandOpen]: expandido === id ? true : false,
									// })}
									// aria-expanded={expandido === id ? true : false}
									style={{padding: 0}}
								>
									<FlechaAbajoIcon width='10px' height='10px' />
								</IconButton>
							</Box>
						</CardActions>
					</ButtonStyled>
				</Box>
			</Box>
		</CardStyled>
	);
};

export default TarjetaIniciativas;
