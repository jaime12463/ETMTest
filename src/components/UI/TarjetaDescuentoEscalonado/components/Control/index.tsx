import React from 'react';
import {Box, IconButton} from '@mui/material';
import {CajaIcon, QuitarRellenoIcon, AgregarRedondoIcon} from 'assests/iconos';
import {TProductoPedido, TStateInfoDescuentos, TStateInputFocus} from 'models';
import {
	InputCantidades,
	InputPropsEstilos,
} from 'components/UI/InputCantidades';
import {useObtenerClienteActual, useObtenerVisitaActual} from 'redux/hooks';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useObtenerDatosCliente,
} from 'hooks';
import {StateFocusID} from 'components/UI';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {useTranslation} from 'react-i18next';

interface Props {
	abrirCollapse: boolean;
	obtenerCalculoDescuentoProducto: (
		valoresIngresados: {
			inputPolarizado: number | undefined;
			unidades: number;
			subUnidades: number;
		},
		stateInfoDescuento: TStateInfoDescuentos
	) => void;
	producto: TProductoPedido;
	stateFocusId: StateFocusID;
	stateInfoDescuento: TStateInfoDescuentos;
	stateInputFocus: TStateInputFocus;
}

export const Control: React.VFC<Props> = ({
	abrirCollapse,
	obtenerCalculoDescuentoProducto,
	producto,
	stateFocusId,
	stateInfoDescuento,
	stateInputFocus,
}) => {
	const clienteActual = useObtenerClienteActual();
	const visitaActual = useObtenerVisitaActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const configuracionPedido = datosCliente!.configuracionPedido;
	const {mostrarAdvertenciaEnDialogo} = useMostrarAdvertenciaEnDialogo();
	const {infoDescuento} = stateInfoDescuento;
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [cambioValores, setCambioValores] = React.useState<boolean>(false);

	const useEstilosProps: InputPropsEstilos = {
		bordeError: visitaActual.seQuedaAEditar.bordeError,
		cantidadMaximaConfig: configuracionPedido?.cantidadMaximaUnidades ?? 0,
		subUnidades: producto.subUnidades,
		unidades: producto.unidades,
		unidadesDisponibles: producto.unidadesDisponibles,
	};

	const defaultValue = {
		unidades: producto.unidades,
		subUnidades: producto.subUnidades,
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual,
		catalogoMotivo: '',
		infoDescuento: infoDescuento,
	};

	const [getValues, setGetValues] = React.useState(defaultValue);

	const {focusId, setFocusId} = stateFocusId;

	const {inputFocus, setInputFocus} = stateInputFocus;

	const agregarProductoAlPedidoActual = useAgregarProductoAlPedidoActual(
		producto,
		mostrarAdvertenciaEnDialogo,
		getValues,
		setGetValues,
		stateInfoDescuento
	);

	const mostrarAviso = useMostrarAviso();

	const {t} = useTranslation();

	React.useEffect(() => {
		obtenerCalculoDescuentoProducto(
			{
				inputPolarizado: undefined,
				unidades: producto.unidades,
				subUnidades: producto.subUnidades,
			},
			stateInfoDescuento
		);
	}, []);

	React.useEffect(() => {
		if (
			infoDescuento.porcentajeDescuento >= 0 &&
			focusId === producto.codigoProducto
		) {
			if (getValues.unidades > 0 || getValues.subUnidades > 0) {
				agregarProductoAlPedidoActual(defaultValue);
			}
		}
		setGetValues(defaultValue);
	}, [infoDescuento]);

	React.useEffect(() => {
		if (getValues.unidades > 0) {
			agregarProductoAlPedidoActual(
				getValues,
				obtenerCalculoDescuentoProducto,
				{actualizaDescuento: true}
			);
		}
	}, [visitaActual.promosOngoing]);

	React.useEffect(() => {
		if (puedeAgregar) {
			agregarProductoAlPedidoActual(getValues, obtenerCalculoDescuentoProducto);
			setPuedeAgregar(false);
			setCambioValores(false);
		}
	}, [puedeAgregar]);

	const validacionSubUnidades = React.useCallback(() => {
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
		if (cambioValores) {
			agregarProductoAlPedidoActual(getValues, obtenerCalculoDescuentoProducto);
			setCambioValores(false);
		}

		if (producto.descuentoPolarizado) {
			setInputFocus('descuento');
		} else {
			setFocusId(0);
			setInputFocus('productoABuscar');
		}
	}, [getValues]);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCambioValores(true);
		setGetValues({
			...getValues,
			[e.target.name]: e.target.value.replace(/[^0-9]/g, ''),
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
				if (cambioValores) {
					setCambioValores(false);
					agregarProductoAlPedidoActual(
						getValues,
						obtenerCalculoDescuentoProducto
					);
				}
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

	return (
		<Box
			alignSelf={abrirCollapse ? 'center' : 'flex-end'}
			justifySelf='center'
			alignItems='center'
			display='flex'
			gap='2px'
			sx={{gridArea: abrirCollapse ? 'Control2' : 'Control1'}}
		>
			<CajaIcon height={18} width={18} />
			<IconButton
				disabled={producto.unidades === 0}
				name='unidades'
				onClick={handleButtons}
				size='small'
				sx={{marginLeft: '2px', padding: '0'}}
				value='-'
			>
				<QuitarRellenoIcon
					disabled={producto.unidades === 0}
					height={18}
					width={18}
				/>
			</IconButton>
			<InputCantidades
				useEstilosProps={useEstilosProps}
				data-cy={`cantidad-producto-unidades-${producto.codigoProducto}`}
				id='unidades_producto'
				inputProps={{
					style: {textAlign: 'center'},
					inputMode: 'numeric',
				}}
				inputRef={(input) => {
					if (
						inputFocus === 'unidades' &&
						focusId === producto.codigoProducto
					) {
						input?.focus();
					}
				}}
				name='unidades'
				onChange={handleOnChange}
				onClick={() => {
					setInputFocus('unidades');
					setFocusId(producto.codigoProducto);
				}}
				onFocus={(e) => e.target.select()}
				onKeyPress={handleKeyPress}
				value={getValues.unidades}
			/>
			<IconButton
				disabled={
					producto.unidadesDisponibles
						? producto.unidades >= producto.unidadesDisponibles
							? true
							: false
						: !!configuracionPedido?.cantidadMaximaUnidades &&
						  producto.unidades >= configuracionPedido?.cantidadMaximaUnidades
						? true
						: false
				}
				name='unidades'
				onClick={handleButtons}
				size='small'
				sx={{padding: '0'}}
				value='+'
			>
				<AgregarRedondoIcon
					disabled={
						producto.unidadesDisponibles
							? producto.unidades >= producto.unidadesDisponibles
								? true
								: false
							: !!configuracionPedido?.cantidadMaximaUnidades &&
							  producto.unidades >= configuracionPedido?.cantidadMaximaUnidades
							? true
							: false
					}
					height={18}
					width={18}
				/>
			</IconButton>
		</Box>
	);
};
