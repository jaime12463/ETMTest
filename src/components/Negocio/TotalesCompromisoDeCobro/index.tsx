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
	titulo: string;
	total: number;
}

export const TotalesCompromisoDeCobro: React.VFC<Props> = ({
	dataCY,
	titulo,
	total,
}) => {
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
								<Numero valor={total} />
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
