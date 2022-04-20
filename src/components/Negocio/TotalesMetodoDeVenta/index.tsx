import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material';
import {useEstilos} from './useEstilos';
import {useTranslation} from 'react-i18next';
import Numero from 'components/UI/Numero';

interface Props {
	dataCY: string;
	metodoVenta?: string;
	subunidades: number;
	total?: number;
	unidades: number;
}

export const TotalesMetodoDeVenta: React.VFC<Props> = ({
	dataCY,
	metodoVenta,
	subunidades,
	total,
	unidades,
}) => {
	const estilos = useEstilos();
	const {t} = useTranslation();

	return (
		<TableContainer component={Paper}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell className={estilos.celda}>
							{`${t('general.total')} ${metodoVenta ?? ''}:`}
						</TableCell>
						<TableCell className={estilos.celda} data-cy={`total-${dataCY}`}>
							<Typography variant='caption'>
								{total && <Numero valor={total} />}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className={estilos.celda}>
							<Typography
								className={estilos.subTitulo}
								data-cy={`total-unidades-${dataCY}`}
							>
								{t('general.unidades')}: {unidades}
							</Typography>
						</TableCell>
						<TableCell className={estilos.celda}>
							<Typography
								className={estilos.subTitulo}
								data-cy={`total-subunidades-${dataCY}`}
							>
								{t('general.subUnidades')}: {subunidades}
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
