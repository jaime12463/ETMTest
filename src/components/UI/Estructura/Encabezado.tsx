import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {ReactComponent as Logo} from 'assests/images/logo.svg';
import {Grid, Stack, Box} from '@mui/material';
import {RetrocederIcon} from 'assests/iconos';
import theme from 'theme';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
}));

interface Props {
	acciones?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
	titulo?: string;
	onClick?: Function;
}

const Encabezado: React.FC<Props> = ({
	children,
	esConFechaHaciaAtras,
	acciones,
	titulo,
	onClick,
}) => {
	return (
		<AppBar position='relative' elevation={0}>
			<StyledToolbar>
				<Grid container alignItems='flex-end' flexWrap='nowrap'>
					<Grid item>
						<Stack direction='row' spacing={2} justifyContent='space-between'>
							{esConFechaHaciaAtras && (
								<IconButton
									size='small'
									onClick={() => (onClick ? onClick() : null)}
									data-cy='boton-atras'
								>
									<RetrocederIcon />
								</IconButton>
							)}
						</Stack>
					</Grid>
					<Box alignItems='flex-end' display='flex' gap='16px'>
						<Box position='relative'>
							<Logo />
						</Box>

						<Typography noWrap style={{fontWeight: 'bold'}}>
							{titulo ?? children}
						</Typography>
					</Box>
					<Grid
						item
						display='flex'
						justifyContent='flex-end'
						sx={{width: '100%'}}
					>
						{acciones && acciones}
					</Grid>
				</Grid>
			</StyledToolbar>
			<Box
				position='absolute'
				borderRadius='50%'
				height='8px'
				width='120%'
				sx={{
					top: '72px',
					left: '-10%',
					background: theme.palette.primary.main,
					zIndex: 100,
				}}
			/>
		</AppBar>
	);
};

export default Encabezado;
