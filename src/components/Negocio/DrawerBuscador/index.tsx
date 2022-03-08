import React from 'react';
import Drawer from 'components/UI/Drawer';
import DrawerFiltros from 'components/UI/DrawerFiltros';
import {
	useDebounce,
	useFiltradorProductos,
	useObtenerFiltrosDelCliente,
} from 'hooks';
import Filtros from './Components/Filtros';
import Busqueda from './Components/Busqueda';
import HeaderBuscador from './Components/HeaderBuscador';
import {
	FiltrosBusqueda,
	ItemsBusqueda,
} from 'hooks/useObtenerFiltrosDelCliente';

interface Props {
	openBuscador: boolean;
	setOpenBuscador: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDFiltros {
	envases: number[];
	familias: number[];
	sabores: number[];
	marcas: number[];
	medidas: number[];
}

const DrawerBuscador: React.FC<Props> = ({openBuscador, setOpenBuscador}) => {
	const [abrirFiltros, setAbrirFiltros] = React.useState<boolean>(false);

	const [inputBusqueda, setInputBusqueda] = React.useState<string>('');

	const debouncedInput = useDebounce(inputBusqueda);

	const estadoInicialFiltros = useObtenerFiltrosDelCliente();

	const [filtrosBusqueda, setFiltrosBusqueda] =
		React.useState<FiltrosBusqueda>(estadoInicialFiltros);

	const idFiltros = React.useMemo(() => {
		return Object.entries(filtrosBusqueda).reduce((acc, [key, arr]) => {
			return {
				...acc,
				[key]: arr
					.filter((item: ItemsBusqueda) => item.checked)
					.map((item: ItemsBusqueda) => item.id),
			};
		}, {} as IDFiltros);
	}, [filtrosBusqueda]);

	const resultadosBusqueda = useFiltradorProductos(debouncedInput, idFiltros);

	const cantidadFiltrosAplicados = React.useMemo(
		() =>
			Object.values(filtrosBusqueda).reduce(
				(total, arr) =>
					total + arr.filter((item: ItemsBusqueda) => item.checked).length,
				0
			),
		[filtrosBusqueda]
	);

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
				debouncedInput={debouncedInput}
				setOpenBuscador={setOpenBuscador}
				setInputBusqueda={setInputBusqueda}
				setFiltrosBusqueda={setFiltrosBusqueda}
				estadoInicialFiltros={estadoInicialFiltros}
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
