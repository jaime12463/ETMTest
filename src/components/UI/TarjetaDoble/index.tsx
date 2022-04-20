import {Box} from '@mui/material';
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

interface Props {
	borderColor?: string;
	derecha: React.ReactNode;
	izquierda: React.ReactNode;
	widthDerecha: string;
	widthIzquierda: string;
}

export const TarjetaDoble: React.FC<Props> = ({
	borderColor = '#D9D9D9',
	derecha,
	izquierda,
	widthDerecha,
	widthIzquierda,
}) => {
	return (
		<CardContenedor border={`1px solid ${borderColor}`}>
			<Izquierda width={widthIzquierda}>{izquierda}</Izquierda>
			<Derecha width={widthDerecha}>{derecha}</Derecha>
		</CardContenedor>
	);
};
