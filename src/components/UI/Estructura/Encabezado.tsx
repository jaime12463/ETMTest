import {useHistory} from 'react-router-dom';
import {Box, Grid, IconButton} from '@material-ui/core';
import Headers from 'assests/images/pop_up_onda.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Fragment} from 'react';
import {Center} from '..';

type Props = {
	children: React.ReactNode;
	acciones?: JSX.Element;
	esConFechaHaciaAtras?: boolean;
};

const Encabezado = ({children, esConFechaHaciaAtras, acciones}: Props) => {
	const history = useHistory();
	return (
		<Box display='flex' justifyContent='center' component='header'>
			<Box
				display='flex'
				style={{
					backgroundImage: `url(${Headers})`,
					backgroundSize: 'cover',
					height: '75px',
					width: '444px',
				}}
				pb={2}
			>
				<Grid container>
					<Grid item xs={2}>
						<Center>
							{esConFechaHaciaAtras && (
								<IconButton size='small' onClick={() => history.goBack()}>
									<ArrowBackIcon style={{color: 'white'}} />
								</IconButton>
							)}
						</Center>
					</Grid>
					<Grid item xs={8}>
						<Center>{children}</Center>
					</Grid>
					<Grid item xs={2}>
						<Center>{acciones ?? <Fragment />}</Center>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Encabezado;
