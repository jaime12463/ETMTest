import {Box, Container} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const PieDePagina = ({children}: Props) => {
	const estilos = useEstilos();
	return (
		<Box display='flex' justifyContent='center'>
			<Container maxWidth='xs' component='footer' disableGutters={true}>
				<Box>{children}</Box>
			</Container>
		</Box>
	);
};

export default PieDePagina;
