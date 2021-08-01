import React from 'react';
import {Box, Container} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const Cuerpo = ({children}: Props) => {
	const estilos = useEstilos();
	return (
		<Box display='flex' justifyContent='center' className={estilos.main}>
			<Container maxWidth='xs' component='main' disableGutters={true}>
				<Box p={1}>{children}</Box>
			</Container>
		</Box>
	);
};

export default Cuerpo;
