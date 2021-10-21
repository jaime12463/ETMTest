import {Box, Card, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

const CardContenedor = styled(Card)(() => ({
	boxShadow: 'none',
	display: 'flex',
	border: '1px solid #D9D9D9',
	borderRadius: '8px',
}));

const Izquierda = styled(Grid)(() => ({
	boxShadow: 'none',
}));

const Derecha = styled(Grid)(() => ({
	background: '#f4f4f4',
	borderLeft: '1px solid #D9D9D9',
	boxShadow: 'none',
}));

type Props = {
	derecha: React.ReactNode;
	izquierda: React.ReactNode;
	widthIzquierda: string;
	widthDerecha: string;
};

export const TarjetaDoble = ({
	derecha,
	izquierda,
	widthIzquierda,
	widthDerecha,
}: Props) => {
	return (
		<CardContenedor>
			<Grid container minWidth='304px' maxWidth='304px'>
				<Izquierda item width={widthIzquierda}>
					{izquierda}
				</Izquierda>
				<Derecha item width={widthDerecha}>
					{derecha}
				</Derecha>
			</Grid>
		</CardContenedor>
	);
};
