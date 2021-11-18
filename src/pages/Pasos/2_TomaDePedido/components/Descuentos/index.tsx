import InputConIcono from 'components/UI/InputConIcono';
import {useTranslation} from 'react-i18next';

type Props = {
	tipo: 'polarizado' | 'escalonado';
};

export const Descuentos = (props: Props) => {
	const {tipo} = props;
	const {t} = useTranslation();

	if (tipo === 'polarizado') {
		return (
			<>
				<InputConIcono
					value={''}
					valid={true}
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
	}
	return null;
};
