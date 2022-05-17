import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {ReactComponent as Logo} from 'assests/images/logo.svg';
import {Grid, Stack, Box} from '@mui/material';
import {RetrocederIcon} from 'assests/iconos';
import theme from 'theme';
import React from 'react';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
}));

interface Props {
	botonResumen?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
	fechaEntrega?: JSX.Element;
	onClick?: Function;
	titulo?: string;
}

const Encabezado: React.FC<Props> = ({
	botonResumen,
	children,
	esConFechaHaciaAtras,
	fechaEntrega,
	onClick,
	titulo,
}) => {
	const [openResumenPedido, setOpenResumenPedido] =
		React.useState<boolean>(false);

	return (
		<AppBar position='relative' elevation={0} sx={{height: 80}}>
			<Toolbar
				sx={{
					height: '100%',
					padding: '26px 14px 6px 14px !important',
					justifyContent: 'space-between',
				}}
			>
				{esConFechaHaciaAtras && (
					<IconButton
						size='small'
						onClick={() => (onClick ? onClick() : null)}
						data-cy='boton-atras'
						sx={{
							left: '10px',
							padding: 0,
							position: 'absolute',
							top: '10px',
						}}
					>
						<RetrocederIcon height={15} width={15} />
					</IconButton>
				)}
				<Box display='flex' flexDirection='column' gap='6px'>
					<Box alignItems='center' display='flex' height='32px'>
						<Typography fontSize='12px' fontWeight={700} width='170px'>
							{!!titulo && titulo?.length > 50
								? `${titulo.slice(0, 51)}...`
								: titulo ?? children}
						</Typography>
					</Box>
					{fechaEntrega && fechaEntrega}
					<Logo
						style={{
							position: 'absolute',
							left: '23px',
							top: '23px',
							opacity: 0.34,
							zIndex: 101,
						}}
					/>
				</Box>
				<Box alignSelf='flex-start' zIndex={101}>
					{botonResumen && botonResumen}
				</Box>
			</Toolbar>
			<Box
				position='absolute'
				borderRadius='50%'
				height='8px'
				width='120%'
				sx={{
					top: '75px',
					left: '-10%',
					background: theme.palette.primary.main,
					zIndex: 100,
				}}
			/>
		</AppBar>
	);
};

export default Encabezado;
