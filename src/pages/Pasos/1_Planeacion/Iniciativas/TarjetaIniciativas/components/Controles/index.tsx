import React from 'react';
import {
	EUnidadMedida,
	GetValueProps,
	InputsKeysFormTomaDePedido,
	TCantidadesProductosIniciativas,
	TProductoPedido,
} from 'models';
import {Contador, useMostrarAdvertenciaEnDialogo, useMostrarAviso} from 'hooks';
import {useAppDispatch} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {editarUnidadesOSubUnidadesEjecutadas} from 'redux/features/visitaActual/visitaActualSlice';
import {InputPropsEstilos, ControlesProducto} from 'components/UI';

interface Props {
	cantidadesProductos: TCantidadesProductosIniciativas;
	getValues: GetValueProps;
	idIniciativa: number;
	producto: TProductoPedido;
	restoContador: Omit<Contador, 'contador' | 'reiniciar'>;
	setGetValues: React.Dispatch<React.SetStateAction<GetValueProps>>;
	useEstilosProps: InputPropsEstilos;
	unidadMedida: EUnidadMedida;
}

export const Controles: React.VFC<Props> = ({
	cantidadesProductos,
	getValues,
	idIniciativa,
	producto,
	restoContador: {actualizarContador, decrementar, estadoInicial, incrementar},
	setGetValues,
	useEstilosProps,
	unidadMedida,
}) => {
	const {t} = useTranslation();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [focusId, setFocusId] = React.useState<number>(0);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');

	const mostrarAviso = useMostrarAviso();

	const dispatch = useAppDispatch();

	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			dispatch(
				editarUnidadesOSubUnidadesEjecutadas({
					codigoProducto: producto.codigoProducto,
					unidades: getValues.unidades,
					subUnidades: getValues.subUnidades,
					codigoIniciativa: idIniciativa,
				})
			);
		}

		return () => setPuedeAgregar(false);
	}, [puedeAgregar]);

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {value, name} = e.currentTarget;
		setFocusId(producto.codigoProducto);
		if (name === 'unidades') {
			if (value === '-' && getValues.unidades === 0) {
				return;
			}
			setInputFocus('unidades');

			const unidadesTotalesIniciativa = Object.values(
				cantidadesProductos
			).reduce((total, actual) => (total += actual.unidades), 0);

			if (unidadMedida === EUnidadMedida.Unidad) {
				if (value === '+') {
					decrementar();
				}

				if (unidadesTotalesIniciativa <= estadoInicial) {
					if (value === '-') {
						incrementar();
					}
				}
			}

			setGetValues({
				...getValues,
				[name]: value === '+' ? ++getValues.unidades : --getValues.unidades,
			});
			setPuedeAgregar(true);
		}

		if (name === 'subUnidades') {
			if (value === '-' && getValues.subUnidades === 0) {
				return;
			}
			setInputFocus('subUnidades');

			if (unidadMedida === EUnidadMedida.SubUnidad) {
				if (value === '+') {
					decrementar(producto.subunidadesVentaMinima);
				}

				if (
					getValues.subUnidades - producto.subunidadesVentaMinima <=
					estadoInicial
				) {
					if (value === '-') {
						incrementar(producto.subunidadesVentaMinima);
					}
				}
			}

			setGetValues((prevState) => ({
				...prevState,
				[name]:
					value === '+'
						? prevState.subUnidades + producto.subunidadesVentaMinima
						: prevState.subUnidades - producto.subunidadesVentaMinima,
			}));
			setPuedeAgregar(true);
		}
	};

	const validacionSubUnidades = () => {
		if (
			getValues.subUnidades % producto.subunidadesVentaMinima !== 0 &&
			getValues.subUnidades < producto.presentacion
		) {
			mostrarAviso(
				'error',
				t('advertencias.subUnidadesNoMultiplo', {
					subunidadesVentaMinima: producto.subunidadesVentaMinima,
				})
			),
				dispatch(
					editarUnidadesOSubUnidadesEjecutadas({
						codigoProducto: producto.codigoProducto,
						unidades: getValues.unidades,
						subUnidades: 0,
						codigoIniciativa: idIniciativa,
					})
				);
			setGetValues((state) => ({...state, subUnidades: 0}));
			return;
		}

		setPuedeAgregar(true);
		setFocusId(0);
		setInputFocus('productoABuscar');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGetValues((state) => {
			if (e.target.name === 'subUnidades') {
				if (+e.target.value >= producto.presentacion) {
					mostrarAviso('error', t('advertencias.limiteSubUnidades'));
					return {...state, [e.target.name]: 0};
				}
			}

			return {
				...state,
				[e.target.name]: +e.target.value.replace(/[^0-9]/g, ''),
			};
		});

		setFocusId(producto.codigoProducto);

		if (e.target.name === 'unidades') {
			setPuedeAgregar(true);
		}

		if (e.target.name === 'subUnidades') {
			validacionSubUnidades();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
				agregarProductoAlPedidoActual(getValues);
				dispatch(
					editarUnidadesOSubUnidadesEjecutadas({
						codigoProducto: producto.codigoProducto,
						unidades: getValues.unidades,
						subUnidades: getValues.subUnidades,
						codigoIniciativa: idIniciativa,
					})
				);
			}

			if (inputFocus === 'subUnidades') {
				validacionSubUnidades();
			}
		}
	};

	React.useEffect(() => {
		const [unidadesTotales, subUnidadesTotales] = Object.values(
			cantidadesProductos
		).reduce(
			(total, cantidad) => {
				total[0] += cantidad.unidades;
				total[1] += cantidad.subUnidades;
				return total;
			},
			[0, 0]
		);

		if (unidadMedida === EUnidadMedida.Unidad) {
			actualizarContador(unidadesTotales);
		}

		if (unidadMedida === EUnidadMedida.SubUnidad) {
			actualizarContador(subUnidadesTotales);
		}
	}, [cantidadesProductos]);

	return (
		<ControlesProducto
			getValues={getValues}
			handleButtons={handleButtons}
			onBlur={validacionSubUnidades}
			onChange={handleInputChange}
			onKeyPress={handleKeyPress}
			producto={producto}
			stateFocusId={{focusId, setFocusId}}
			stateInputFocus={{inputFocus, setInputFocus}}
			useEstilosProps={useEstilosProps}
		/>
	);
};
