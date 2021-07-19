import React from 'react';
import {Container} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const Cuerpo = ({
	children,
}: Props) => {
	const estilos = useEstilos();
	return (
		<Container maxWidth='xs' component="main" className={estilos.main}>
			<div>
				{children}
			</div>
		</Container>
	);
};

export default Cuerpo;
