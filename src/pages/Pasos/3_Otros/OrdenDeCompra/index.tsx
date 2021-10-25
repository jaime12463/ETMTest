import React from 'react';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarOrdenDeCompra} from 'redux/features/visitaActual/visitaActualSlice';
import {TVisita} from 'models';
import InputConIcono from 'components/UI/InputConIcono';
import {useTranslation} from 'react-i18next';

const OrdenDeCompra: React.FC = () => {
	const visitaActual: TVisita = useObtenerVisitaActual();
	const [ordenDeCompra, setOrdenDeCompra] = React.useState<string>(
		visitaActual.ordenDeCompra
	);
	const [mostrarIcono, setMostrarIcono] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const {t} = useTranslation();

	React.useEffect(() => {
		if (ordenDeCompra.length > 0) {
			setMostrarIcono(true);
		} else {
			setMostrarIcono(false);
		}
		dispatch(cambiarOrdenDeCompra({ordenDeCompra}));
	}, [ordenDeCompra]);

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setOrdenDeCompra(e.target.value);
	};

	return (
		<InputConIcono
			value={ordenDeCompra}
			onChange={handleChange}
			valid={mostrarIcono}
			label={t('general.numeroOrdenDeCompra')}
		/>
	);
};

export default OrdenDeCompra;
