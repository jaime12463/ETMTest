import {Box, Container} from '@mui/material';

export type Props = {
	children: React.ReactNode;
};

const PieDePagina = ({children}: Props) => {
	return (
		<Box display='flex' justifyContent='center'>
			<Container maxWidth='xs' component='footer' disableGutters={true}>
				<Box p={1}>{children}</Box>
			</Container>
		</Box>
	);
};

export default PieDePagina;
