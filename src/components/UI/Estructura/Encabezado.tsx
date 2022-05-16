import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ReactComponent as Logo } from 'assests/images/logo.svg';
import { Grid, Stack, Box } from '@mui/material';
import { RetrocederIcon } from 'assests/iconos';
import theme from 'theme';
import React from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
}));

interface Props {
	acciones?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
	titulo?: string;
	onClick?: Function;
	botonResumen?: JSX.Element;
	fechaEntrega?: JSX.Element;
}

const Encabezado: React.FC<Props> = ({
	children,
	esConFechaHaciaAtras,
	acciones,
	titulo,
	onClick,
	botonResumen,
	fechaEntrega,
}) => {
	const [openResumenPedido, setOpenResumenPedido] = React.useState<boolean>(false);

	return (
		<AppBar position='relative' elevation={0} sx={{ height: 69 }}>
			<Toolbar
				sx={{
					height: '100%',
					padding: '24px 18px 14px 95px !important',
					justifyContent: 'space-between',
				}}
			>
				{esConFechaHaciaAtras && (
					<IconButton
						size='small'
						onClick={() => (onClick ? onClick() : null)}
						data-cy='boton-atras'
						sx={{
							position: 'absolute',
							left: '0',
							top: '0'
						}}
					>
						<RetrocederIcon />
					</IconButton>
				)}
				<Box>
					<Typography fontSize='12px' fontWeight={700}
						style={{
							position: 'absolute',
							top: '23px',
							left: '14px',
    						width:'173px',
    						textOverflow: 'ellipsis',
    						overflow:'hidden',
    						whiteSpace:'nowrap',
							// -webkit-box-orient: vertical,
							// -webkit-line-clamp: 2,
							// line-height: 1,
						}}>
						{titulo ?? children}
					</Typography>
					<Logo
						style={{
							position: 'absolute',
							left: '9px',
							top: '12px',
							opacity: '34%',
							zIndex: 101,
						}}
					/>
				</Box>
				{fechaEntrega && fechaEntrega}
				{botonResumen && botonResumen}
				{acciones && acciones}
			</Toolbar>
			<Box
				position='absolute'
				borderRadius='50%'
				height='8px'
				width='120%'
				sx={{
					top: '65px',
					left: '-10%',
					background: theme.palette.primary.main,
					zIndex: 100,
				}}
			/>
		</AppBar>
	);
};

export default Encabezado;
