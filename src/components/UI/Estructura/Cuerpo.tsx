import React, {Fragment} from 'react';
import {Box, Container} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const Cuerpo = ({children}: Props) => {
	const estilos = useEstilos();
	return (
		<Box display='flex' justifyContent='center' className={estilos.main}>
			<Container
				maxWidth='xs'
				component='main'
				disableGutters={true}
				className={estilos.main}
				style={{
					paddingRight: '1rem',
					paddingLeft: '1rem',
				}}
			>
				<Fragment>{children}</Fragment>
			</Container>
		</Box>
	);
};

export default Cuerpo;
