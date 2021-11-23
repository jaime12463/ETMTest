import InputConIcono from 'components/UI/InputConIcono';
import {useTranslation} from 'react-i18next';
import {Box} from '@mui/material';

type Props = {
	tipo: 'polarizado' | 'escalonado' | 'eliminado' | undefined;
};

export const Descuentos = (props: Props) => {
	const {tipo} = props;
	const {t} = useTranslation();

	console.log(tipo);

	if (tipo === 'polarizado') {
		return (
			<>
				<InputConIcono
					value={'fdfdf'}
					valid={false}
					onChange={() => {}}
					label={t('general.agregarCompromisoDeCobro')}
					margin='20px 0 0 0 '
					simboloMoneda
					error={false}
					mensajeError={''}
				/>
			</>
		);
	} else if (tipo === 'escalonado') {
		return <></>;
	} else {
		return null;
	}
};
