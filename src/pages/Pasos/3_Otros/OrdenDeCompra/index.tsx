import React from 'react';
import {useAppDispatch, useObtenerVisitaActual} from 'redux/hooks';
import {cambiarOrdenDeCompra} from 'redux/features/visitaActual/visitaActualSlice';
import {TVisita} from 'models';
import {InputConIcono} from 'components/UI';
import {useTranslation} from 'react-i18next';
import {useMostrarAviso} from 'hooks';

const OrdenDeCompra: React.FC = () => {
	const visitaActual: TVisita = useObtenerVisitaActual();
	const mostrarAviso = useMostrarAviso();
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
	}, [ordenDeCompra]);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			mostrarAviso(
				'success',
				'Orden de compra agregado correctamente',
				undefined,
				undefined,
				'bonificacionAgregada'
			);
			dispatch(cambiarOrdenDeCompra({ordenDeCompra}));
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		mostrarAviso(
			'success',
			'Orden de compra agregado correctamente',
			undefined,
			undefined,
			'bonificacionAgregada'
		);
		dispatch(cambiarOrdenDeCompra({ordenDeCompra}));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setOrdenDeCompra(e.target.value.trim());
	};

	return (
		<InputConIcono
			value={ordenDeCompra}
			onChange={handleChange}
			onKeyPress={handleKeyPress}
			onBlur={handleBlur}
			valid={mostrarIcono}
			label={t('general.numeroOrdenDeCompra')}
			focus
		/>
	);
};

export default OrdenDeCompra;
