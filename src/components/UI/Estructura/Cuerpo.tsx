import React, {Fragment} from 'react';
import {Container, Grid} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const Cuerpo = ({children}: Props) => {
	const estilos = useEstilos();
	return (
		<Container maxWidth='xs' component='main' className={estilos.main}>
			<Fragment>{children}</Fragment>
		</Container>
	);
};

export default Cuerpo;
