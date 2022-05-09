import React from 'react';
import {Box, IconButton} from '@mui/material';
import {
	CajaIcon,
	QuitarRellenoIcon,
	AgregarRedondoIcon,
	BotellaIcon,
} from 'assests/iconos';
import {InputCantidades, InputPropsEstilos} from '../InputCantidades';
import {
	InputsKeysFormTomaDePedido,
	TCantidadesProductosIniciativas,
	TProductoPedido,
} from 'models';
import {
	useMostrarAdvertenciaEnDialogo,
	useMostrarAviso,
	useValidacionPermiteSubUnidades,
} from 'hooks';
import {GetValueProps} from 'pages/Pasos/3_Otros/Canjes/TarjetaCanjes';
import {useAppDispatch} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {useAgregarProductoAlPedidoActual} from 'pages/Pasos/2_TomaDePedido/hooks';
import {editarUnidadesOSubUnidadesEjecutadas} from 'redux/features/visitaActual/visitaActualSlice';

interface Props {
	cantidadesProductos: TCantidadesProductosIniciativas;
	cantidadMaximaUnidades?: number;
	getValues: GetValueProps;
	idIniciativa: number;
	producto: TProductoPedido;
	setGetValues: React.Dispatch<React.SetStateAction<GetValueProps>>;
	useEstilosProps: InputPropsEstilos;
}

export const ControlesProducto: React.VFC<Props> = ({
	cantidadesProductos,
	cantidadMaximaUnidades,
	getValues,
	idIniciativa,
	producto,
	setGetValues,
	useEstilosProps,
}) => {
	const {t} = useTranslation();
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const [focusId, setFocusId] = React.useState<number>(0);
	const [inputFocus, setInputFocus] =
		React.useState<InputsKeysFormTomaDePedido>('productoABuscar');
	const permiteSubUnidades = useValidacionPermiteSubUnidades(producto);

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

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		debugger;
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

	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
			} else if (inputFocus === 'subUnidades') {
				validacionSubUnidades();
			}
		}
	};

	return (
		<Box
			alignItems='center'
			display='flex'
			flexDirection='column'
			gap='12px'
			padding='22px 12px 12px 8px'
			width='125px'
		>
			<Box alignItems='center' display='flex' justifyContent='center'>
				<CajaIcon height={18} style={{marginRight: '4px'}} width={18} />
				{!useEstilosProps.disabled && (
					<IconButton
						disabled={getValues.unidades === 0}
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{marginRight: '2px', padding: 0}}
						value='-'
					>
						<QuitarRellenoIcon
							disabled={getValues.unidades === 0}
							height={18}
							width={18}
						/>
					</IconButton>
				)}
				<InputCantidades
					data-cy={`cantidad-producto-unidades-${producto.codigoProducto}`}
					id='unidades_producto'
					inputRef={(input) => {
						if (
							inputFocus === 'unidades' &&
							focusId === producto.codigoProducto
						) {
							input?.focus();
						}
					}}
					name='unidades'
					onChange={handleInputChange}
					onClick={() => {
						setInputFocus('unidades');
						setFocusId(producto.codigoProducto);
					}}
					onFocus={(e) => e.target.select()}
					onKeyPress={handleKeyPress}
					useEstilosProps={useEstilosProps}
					value={cantidadesProductos[producto.codigoProducto].unidades}
				/>
				{!useEstilosProps.disabled && (
					<IconButton
						disabled={
							producto.unidadesDisponibles
								? producto.unidades >= producto.unidadesDisponibles
									? true
									: false
								: !!cantidadMaximaUnidades &&
								  producto.unidades >= cantidadMaximaUnidades
								? true
								: false
						}
						name='unidades'
						onClick={handleButtons}
						size='small'
						sx={{marginLeft: '2px', padding: 0}}
						value='+'
					>
						<AgregarRedondoIcon
							disabled={
								producto.unidadesDisponibles
									? producto.unidades >= producto.unidadesDisponibles
										? true
										: false
									: !!cantidadMaximaUnidades &&
									  producto.unidades >= cantidadMaximaUnidades
									? true
									: false
							}
							height={18}
							width={18}
						/>
					</IconButton>
				)}
			</Box>
			{permiteSubUnidades && (
				<Box alignItems='center' display='flex' justifyContent='center'>
					<BotellaIcon height={18} style={{marginRight: '4px'}} width={18} />
					{!useEstilosProps.disabled && (
						<IconButton
							disabled={getValues.subUnidades === 0}
							name='subUnidades'
							onClick={handleButtons}
							size='small'
							sx={{marginRight: '2px', padding: 0}}
							value='-'
						>
							<QuitarRellenoIcon
								disabled={getValues.subUnidades === 0}
								height={18}
								width={18}
							/>
						</IconButton>
					)}
					<InputCantidades
						useEstilosProps={useEstilosProps}
						data-cy={`cantidad-producto-subUnidades-${producto.codigoProducto}`}
						id='subUnidades_producto'
						inputRef={(input) => {
							if (
								inputFocus === 'subUnidades' &&
								focusId === producto.codigoProducto
							) {
								input?.focus();
							}
						}}
						name='subUnidades'
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						onBlur={validacionSubUnidades}
						onClick={() => {
							setInputFocus('subUnidades');
							setFocusId(producto.codigoProducto);
						}}
						onFocus={(e) => e.target.select()}
						value={cantidadesProductos[producto.codigoProducto].subUnidades}
					/>
					{!useEstilosProps.disabled && (
						<IconButton
							disabled={
								getValues.subUnidades >=
								producto.presentacion - producto.subunidadesVentaMinima
							}
							name='subUnidades'
							onClick={handleButtons}
							size='small'
							sx={{marginLeft: '2px', padding: 0}}
							value='+'
						>
							<AgregarRedondoIcon
								disabled={
									getValues.subUnidades >=
									producto.presentacion - producto.subunidadesVentaMinima
								}
								height={18}
								width={18}
							/>
						</IconButton>
					)}
				</Box>
			)}
		</Box>
	);
};
