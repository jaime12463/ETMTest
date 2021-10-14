import {Fragment} from 'react';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useHistory} from 'react-router-dom';
import Logo from 'assests/images/logo.svg';
import {Grid, Stack, Box} from '@mui/material';
import {RetrocederIcon} from 'assests/iconos';
import { useResetVisitaActual } from 'hooks';
import LogoRecortado from 'assests/images/logo-recorte.svg'

const StyledToolbar = styled(Toolbar)(({theme}) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
}));

interface Props {
	acciones?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
	resetearCliente?: boolean;
	titulo?: string;
	onClick?: Function;
};

const Encabezado : React.FC<Props> = ({children, esConFechaHaciaAtras, acciones, resetearCliente, titulo, onClick}) => {
	const history = useHistory();

	const resetCliente = useResetVisitaActual()

	const irAtras = () => {
		if(resetearCliente){
			resetCliente()
		}

		history.goBack()
	}

	return (
		<AppBar position='static' elevation={0} >
			<StyledToolbar>
				<Grid container alignItems="flex-end" flexWrap="nowrap">
					<Grid item>
						<Stack direction='row' spacing={2} justifyContent='space-between'>
							{esConFechaHaciaAtras && (
								<IconButton
									size='small'
									onClick={ () => (onClick) ? onClick() : null }
									data-cy='boton-atras'
								>
									<RetrocederIcon style={{color: 'white'}} />
							</IconButton>
								)}
							{acciones && acciones}
						</Stack>
					</Grid>
					<Grid item>
						<Stack direction='row' spacing={2}>
								<Box ml={1}>
								{
									titulo 
									? 
										(
												titulo?.length > 20 
													? <img src={Logo} alt='logo'></img> 
													: <img src={LogoRecortado} alt='logo'></img>
										) 
									: 
										<img src={Logo} alt='logo'></img>
								}
								</Box>
								<Stack
									direction='column'
									justifyContent='flex-end'
									alignItems='flex-start'
									spacing={1}
								>
									<Typography style={{fontWeight: 'bold'}}>{titulo ?? children}</Typography>
								</Stack>
							</Stack>
					</Grid>
				</Grid>
			</StyledToolbar>
		</AppBar>
	);
};

export default Encabezado;
