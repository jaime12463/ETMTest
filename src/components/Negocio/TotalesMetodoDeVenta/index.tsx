import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core';
import {useEstilos} from './useEstilos';

export type Props = {
	metodoVenta: string;
	total: number;
	unidades: number;
	subunidades: number;
};

const TotalesMetodoDeVenta = ({
	metodoVenta,
	total,
	unidades,
	subunidades,
}: Props) => {
	const estilos = useEstilos();

	return (
		<TableContainer component={Paper}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell className={estilos.celda}>
							<Typography variant='caption'>{`Total ${metodoVenta}: $${total} `}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={estilos.celda}>
							<Typography
								className={estilos.subTitulo}
							>{`Unidades: ${unidades}`}</Typography>
							<Typography
								className={estilos.subTitulo}
							>{`Subunidades: ${subunidades} `}</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TotalesMetodoDeVenta;
