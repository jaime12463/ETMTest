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
import {useTranslation} from 'react-i18next';

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
	const {t} = useTranslation();

	return (
		<TableContainer component={Paper}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell className={estilos.celda}>
							<Typography variant='caption'>
							{t('general.total')} ${metodoVenta}: $${total.toFixed(2)}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={estilos.celda}>
							<Typography
								className={estilos.subTitulo}
							>{t('general.unidades')}: ${unidades}</Typography>
							<Typography
								className={estilos.subTitulo}
							>{t('general.subUnidades')}: ${subunidades}</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TotalesMetodoDeVenta;
