import React from 'react';
import {
	StateFocusID,
	TClienteActual,
	TProductoPedido,
	TStateInputFocus,
} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {
	useAppDispatch,
	useObtenerClienteActual,
	useObtenerVisitaActual,
} from 'redux/hooks';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';
import {
	agregarCoberturasEjecutadas,
	borrarProductoDelPedidoActual,
} from 'redux/features/visitaActual/visitaActualSlice';
import {ControlesProducto, InputPropsEstilos} from 'components/UI';

interface Props {
	producto: TProductoPedido;
	stateInputFocus: TStateInputFocus;
	stateFocusId: StateFocusID;
	resetCoberturas: boolean;
	setResetCoberturas: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controles: React.VFC<Props> = ({
	producto,
	stateInputFocus,
	stateFocusId,
	resetCoberturas,
	setResetCoberturas,
}) => {
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const visitaActual = useObtenerVisitaActual();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const coberturaEjecutada = visitaActual.coberturasEjecutadas.find(
		(p) => producto.codigoProducto === p.codigoProducto
	);

	const defaultValues = {
		unidades: coberturaEjecutada?.unidades ?? producto.unidades,
		subUnidades: coberturaEjecutada?.subUnidades ?? producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
	};

	const {focusId, setFocusId} = stateFocusId;

	const [getValues, setGetValues] = React.useState(defaultValues);

	const {inputFocus, setInputFocus} = stateInputFocus;

	const clienteActual: TClienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const {configuracionPedido}: any = datosCliente;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues
	);
	const {t} = useTranslation();
	const mostrarAviso = useMostrarAviso();
	const dispatch = useAppDispatch();

	const useEstilosProps: InputPropsEstilos = {
		bordeError: visitaActual.seQuedaAEditar.bordeError,
		cantidadMaximaConfig: configuracionPedido.cantidadMaximaUnidades ?? 0,
		subUnidades: getValues.subUnidades,
		unidades: getValues.unidades,
		unidadesDisponibles: producto.unidadesDisponibles,
		disabled: visitaActual.pasoATomaPedido,
	};

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues);
			dispatch(
				agregarCoberturasEjecutadas({
					codigoProducto: producto.codigoProducto,
					unidades: getValues.unidades,
					subUnidades: getValues.subUnidades,
				})
			);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	const validacionSubUnidades = () => {
		if (
			getValues.subUnidades % producto.subunidadesVentaMinima !== 0 &&
			getValues.subUnidades < producto.presentacion
		) {
			return (
				mostrarAviso(
					'error',
					t('advertencias.subUnidadesNoMultiplo', {
						subunidadesVentaMinima: producto.subunidadesVentaMinima,
					})
				),
				setGetValues({
					...getValues,
					subUnidades: 0,
				})
			);
		}

		agregarProductoAlPedidoActual(getValues);
		dispatch(
			agregarCoberturasEjecutadas({
				codigoProducto: producto.codigoProducto,
				unidades: getValues.unidades,
				subUnidades: getValues.subUnidades,
			})
		);
		setFocusId(0);
		setInputFocus('productoABuscar');
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setGetValues({
			...getValues,
			[e.target.name]: +e.target.value.replace(/[^0-9]/g, ''),
		});
		setFocusId(producto.codigoProducto);

		if (e.target.name === 'unidades') {
			setPuedeAgregar(true);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			if (inputFocus === 'unidades') {
				setInputFocus('subUnidades');
				agregarProductoAlPedidoActual(getValues);
				dispatch(
					agregarCoberturasEjecutadas({
						codigoProducto: producto.codigoProducto,
						unidades: getValues.unidades,
						subUnidades: getValues.subUnidades,
					})
				);
			} else if (inputFocus === 'subUnidades') {
				validacionSubUnidades();
			}
		}
	};

	const handleButtons = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const {value, name} = e.currentTarget;
		setFocusId(producto.codigoProducto);
		if (name === 'unidades') {
			if (value === '-' && getValues.unidades === 0) {
				return;
			}
			setInputFocus('unidades');
			setGetValues({
				...getValues,
				[name]: value === '+' ? ++getValues.unidades : --getValues.unidades,
			});
			setPuedeAgregar(true);
		} else if (name === 'subUnidades') {
			if (value === '-' && getValues.subUnidades === 0) {
				return;
			}
			setInputFocus('subUnidades');
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

	React.useEffect(() => {
		if (resetCoberturas) {
			dispatch(
				agregarCoberturasEjecutadas({
					codigoProducto: producto.codigoProducto,
					unidades: 0,
					subUnidades: 0,
				})
			);
			setGetValues((prevState) => {
				return {
					...prevState,
					unidades: 0,
					subUnidades: 0,
				};
			});
			setResetCoberturas(false);
		}
	}, [resetCoberturas]);

	return (
		<ControlesProducto
			getValues={getValues}
			handleButtons={handleButtons}
			onBlur={validacionSubUnidades}
			onChange={handleOnChange}
			onKeyPress={handleKeyPress}
			producto={producto}
			stateFocusId={stateFocusId}
			stateInputFocus={stateInputFocus}
			useEstilosProps={useEstilosProps}
		/>
	);
};

export default Controles;
