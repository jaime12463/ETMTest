import {Box, Card, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

const CardContenedor = styled(Box)(() => ({
	borderRadius: '8px',
	display: 'flex',
	overflow: 'visible',
	maxWidth: '304px',
}));

const Izquierda = styled(Box)(() => ({
	boxShadow: 'none',
}));

const Derecha = styled(Box)(() => ({
	background: '#F5F0EF',
	borderRadius: '0px 8px 8px 0px',
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
		<CardContenedor border={`1px solid ${borderColor}`}>
			<Izquierda width={widthIzquierda}>{izquierda}</Izquierda>
			<Derecha width={widthDerecha}>{derecha}</Derecha>
		</CardContenedor>
		// <CardContenedor sx={{border: `1px solid ${borderColor}`}}>
		// 	<Grid container minWidth='304px' maxWidth='304px'>
		// 		<Izquierda item width={widthIzquierda}>
		// 			{izquierda}
		// 		</Izquierda>
		// 		<Derecha item width={widthDerecha}>
		// 			{derecha}
		// 		</Derecha>
		// 	</Grid>
		// </CardContenedor>
	);
};
