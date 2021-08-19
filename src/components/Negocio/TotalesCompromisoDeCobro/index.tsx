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
import Numero from 'components/UI/Numero';

export type Props = {
	titulo: string;
	total: number;
	dataCY: string;
};

const TotalesCompromisoDeCobro = ({titulo, total, dataCY}: Props) => {
	const estilos = useEstilos();
	const {t} = useTranslation();

	return (
		<TableContainer component={Paper}>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell className={estilos.celda}>
							{`${t('general.total')} ${titulo}:`}
						</TableCell>
						<TableCell className={estilos.celda} data-cy={`total-${dataCY}`}>
							<Typography variant='caption'>
								<Numero tipo='moneda' valor={total} decimales={2} />
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TotalesCompromisoDeCobro;
