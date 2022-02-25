import React from 'react';
import Drawer from 'components/UI/Drawer';
import DrawerFiltros from 'components/UI/DrawerFiltros';
import {
	useDebounce,
	useFiltrarPreciosProductosDelClienteActual,
	useObtenerAtributos,
	useObtenerDatosTipoPedido,
	useObtenerPresupuestosTipoPedidoActual,
} from 'hooks';
import {TDataSecundaria, TPrecioProducto} from 'models';
import {FiltroProductos} from 'utils/procesos/filtros/productos/filtroProductos';
import Filtros from './Components/Filtros';
import Busqueda from './Components/Busqueda';
import HeaderBuscador from './Components/HeaderBuscador';

interface Props {
	openBuscador: boolean;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResultadoBusqueda extends TPrecioProducto {
	checked: boolean;
}

export interface ItemsBusqueda extends TDataSecundaria {
	checked: boolean;
}

export interface FiltrosBusqueda {
	envases: ItemsBusqueda[];
	familias: ItemsBusqueda[];
	sabores: ItemsBusqueda[];
	marcas: ItemsBusqueda[];
	medidas: ItemsBusqueda[];
}

const DrawerBuscador: React.FC<Props> = ({openBuscador, setOpenBuscador}) => {
	const [abrirFiltros, setAbrirFiltros] = React.useState<boolean>(false);

	const [inputBusqueda, setInputBusqueda] = React.useState<string>('');

	const debouncedInput = useDebounce(inputBusqueda);

	const [resultadosBusqueda, setResultadosBusqueda] = React.useState<
		ResultadoBusqueda[]
	>([]);

	const preciosProductosDelClienteActual =
		useFiltrarPreciosProductosDelClienteActual();

	const filtroProductos = new FiltroProductos(preciosProductosDelClienteActual);

	const atributos = filtroProductos.obtenerAtributos();

	const {envases, familias, sabores, marcas, medidas} =
		useObtenerAtributos(atributos);

	const estadoInicialFiltros: FiltrosBusqueda = React.useMemo(() => {
		return {
			envases: envases.map((sabor) => ({...sabor, checked: false})),
			familias: familias.map((familia) => ({...familia, checked: false})),
			sabores: sabores.map((sabor) => ({...sabor, checked: false})),
			medidas: medidas.map((medida) => ({...medida, checked: false})),
			marcas: marcas.map((marca) => ({...marca, checked: false})),
		};
	}, []);

	const [filtrosBusqueda, setFiltrosBusqueda] =
		React.useState<FiltrosBusqueda>(estadoInicialFiltros);

	const cantidadFiltrosAplicados = React.useMemo(
		() =>
			Object.values(filtrosBusqueda).reduce(
				(total, arr) =>
					total + arr.filter((item: ItemsBusqueda) => item.checked).length,
				0
			),
		[filtrosBusqueda]
	);

	const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
	const obtenerPresupuestosTipoPedidoActual =
		useObtenerPresupuestosTipoPedidoActual();

	const datosTipoPedidoActual = obtenerDatosTipoPedido();
	const presupuestoTipoPedido = obtenerPresupuestosTipoPedidoActual();

	React.useEffect(() => {
		setResultadosBusqueda([]);
		if (debouncedInput.length >= 3 && preciosProductosDelClienteActual) {
			const resultados = filtroProductos.ejecutar(debouncedInput);

			if (resultados?.length) {
				for (const producto of resultados) {
					// Se valida que se pueda mostrar el producto para ser agregado al pedido
					if (
						(!datosTipoPedidoActual?.validaPresupuesto &&
							!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
								producto.tipoProducto
							)) ||
						(datosTipoPedidoActual?.validaPresupuesto &&
							!presupuestoTipoPedido?.tieneProductosHabilitados &&
							!datosTipoPedidoActual?.tipoProductosHabilitados.includes(
								producto.tipoProducto
							)) ||
						(datosTipoPedidoActual?.validaPresupuesto &&
							presupuestoTipoPedido?.tieneProductosHabilitados &&
							!presupuestoTipoPedido.productosHabilitados.includes(
								producto.codigoProducto
							))
					) {
						// En caso de que se cumpla alguna de estas tres condiciones el producto se descarta de las opciones para agregar
						continue;
					}

					// Se agregan a los resultados de búsqueda
					setResultadosBusqueda((state) => [
						...state,
						{...producto, checked: false},
					]);
				}
				return;
			}
		}

		//Si no hay resultados o se borra la búsqueda vaciamos el array de resultados
		setResultadosBusqueda([]);
	}, [debouncedInput]);

	React.useEffect(() => {
		return () => {
			// Limpieza del estado al cerrar el drawer
			setInputBusqueda('');
			setFiltrosBusqueda(estadoInicialFiltros);
		};
	}, [openBuscador]);

	return (
		<Drawer
			open={openBuscador}
			setOpen={setOpenBuscador}
			titulo={
				<HeaderBuscador
					inputBusqueda={inputBusqueda}
					setInputBusqueda={setInputBusqueda}
					cantidadFiltrosAplicados={cantidadFiltrosAplicados}
					setAbrirFiltros={setAbrirFiltros}
				/>
			}
		>
			<Busqueda
				resultadosBusqueda={resultadosBusqueda}
				setResultadosBusqueda={setResultadosBusqueda}
				debouncedInput={debouncedInput}
				setOpenBuscador={setOpenBuscador}
				setInputBusqueda={setInputBusqueda}
			/>

			<DrawerFiltros open={abrirFiltros} setOpen={setAbrirFiltros}>
				<Filtros
					filtrosBusqueda={filtrosBusqueda}
					setFiltrosBusqueda={setFiltrosBusqueda}
					estadoInicialFiltros={estadoInicialFiltros}
					cantidadFiltrosAplicados={cantidadFiltrosAplicados}
				/>
			</DrawerFiltros>
		</Drawer>
	);
};

export default DrawerBuscador;
