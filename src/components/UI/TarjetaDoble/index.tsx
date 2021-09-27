import {
	Box,
	Card,
	Grid,
} from '@mui/material';
import {styled} from '@mui/material/styles';

const CardContenedor = styled(Card)(({theme}) => ({
	boxShadow: 'none',
	display: 'flex',
	border: '1.5px solid #E4E4E4',
	borderRadius: '8px',
}));

const Izquierda = styled(Grid)(({theme}) => ({
	boxShadow: 'none',
}));

const Derecha = styled(Grid)(({theme}) => ({
	boxShadow: 'none',
	background: '#f4f4f4',
}));

type Props = {
	derecha: React.ReactNode;
	izquierda: React.ReactNode;
};

export const TarjetaDoble = ({derecha, izquierda}: Props) => {
	return (
		<CardContenedor>
			<Grid container>
				<Izquierda xs={7}>{izquierda}</Izquierda>
				<Derecha xs={5}>{derecha}</Derecha>
			</Grid>
		</CardContenedor>
	);
};
