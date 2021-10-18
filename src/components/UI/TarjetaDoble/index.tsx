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
};

export const TarjetaDoble = ({derecha, izquierda}: Props) => {
	return (
		<CardContenedor>
			<Grid container>
				<Izquierda item xs={7}>
					{izquierda}
				</Izquierda>
				<Derecha item xs={5}>
					{derecha}
				</Derecha>
			</Grid>
		</CardContenedor>
	);
};
