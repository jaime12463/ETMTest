import {Box, Card, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

const CardContenedor = styled(Card)(() => ({
	boxShadow: 'none',
	display: 'flex',
	borderRadius: '8px',
}));

const Izquierda = styled(Grid)(() => ({
	boxShadow: 'none',
}));

const Derecha = styled(Grid)(() => ({
	background: '#f4f4f4',

	boxShadow: 'none',
}));

type Props = {
	derecha: React.ReactNode;
	izquierda: React.ReactNode;
	widthIzquierda: string;
	widthDerecha: string;
	borderColor?: string;
};

export const TarjetaDoble = ({
	derecha,
	izquierda,
	widthIzquierda,
	widthDerecha,
	borderColor = '#D9D9D9',
}: Props) => {
	return (
		<CardContenedor sx={{border: `1px solid ${borderColor}`}}>
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
