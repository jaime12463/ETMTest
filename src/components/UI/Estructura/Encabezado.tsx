import {Fragment} from 'react';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useHistory} from 'react-router-dom';
import Logo from 'assests/images/logo.svg';
import {Grid, Stack, Box} from '@mui/material';
import  {RetrocederIcon} from 'assests/iconos';
const StyledToolbar = styled(Toolbar)(({theme}) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
}));

type Props = {
	children: React.ReactNode;
	acciones?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
};

const Encabezado = ({children, esConFechaHaciaAtras, acciones}: Props) => {
	const history = useHistory();
	return (
		<AppBar position='static' elevation={0}>
			<StyledToolbar>
				<Grid container>
					<Grid item xs={12}>
						<Stack direction='row' spacing={2} justifyContent='space-between'>
							{esConFechaHaciaAtras && (
								<IconButton
									size='small'
									onClick={() => history.goBack()}
									data-cy='boton-atras'
								>
									<RetrocederIcon/>
								</IconButton>
							)}
							{acciones ?? <Fragment />}
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack direction='row' spacing={2}>
							<Box ml={1}>
								<img src={Logo} alt='logo'></img>
							</Box>
							<Stack
								direction='column'
								justifyContent='flex-end'
								alignItems='flex-start'
								spacing={1}
							>
								<Typography style={{fontWeight: 'bold'}}>{children}</Typography>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</StyledToolbar>
		</AppBar>
	);
};

export default Encabezado;
