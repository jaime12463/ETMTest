import {useCallback, useEffect, useMemo, useState} from 'react';
import {
	useDebounce,
	useFiltradorProductos,
	useObtenerFiltrosDelCliente,
} from 'hooks';
import {
	FiltrosBusqueda,
	ItemsBusqueda,
} from 'hooks/useObtenerFiltrosDelCliente';
import {HeaderBuscador, Filtros, Busqueda} from './Components';
import {Drawer, DrawerConfig, DrawerFiltros} from 'components/UI';

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

export const DrawerBuscador: React.VFC<Props> = ({
	openBuscador,
	setOpenBuscador,
}) => {
	const [abrirFiltros, setAbrirFiltros] = useState<boolean>(false);

	const [inputBusqueda, setInputBusqueda] = useState<string>('');

	const debouncedInput = useDebounce(inputBusqueda);

	const {obtenerFiltrosCliente} = useObtenerFiltrosDelCliente();

	const estadoInicialFiltros = useMemo(() => obtenerFiltrosCliente(), []);

	const [filtrosBusqueda, setFiltrosBusqueda] =
		useState<FiltrosBusqueda>(estadoInicialFiltros);

	const idFiltros = useMemo(() => {
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

	const cantidadFiltrosAplicados = useMemo(
		() =>
			Object.values(filtrosBusqueda).reduce(
				(total, arr) =>
					total + arr.filter((item: ItemsBusqueda) => item.checked).length,
				0
			),
		[filtrosBusqueda]
	);

	const drawerConfig: DrawerConfig = {
		puller: false,
		height: '85%',
	};

	const restablecerFiltros = useCallback(() => {
		setFiltrosBusqueda(obtenerFiltrosCliente(resultadosBusqueda));
	}, [debouncedInput]);

	useEffect(() => {
		setFiltrosBusqueda(obtenerFiltrosCliente(resultadosBusqueda));
	}, [debouncedInput]);

	useEffect(() => {
		return () => {
			// Limpieza del estado al cerrar el drawer
			setInputBusqueda('');
			setFiltrosBusqueda(estadoInicialFiltros);
			setAbrirFiltros(false);
		};
	}, [openBuscador]);

	return (
		<Drawer
			config={drawerConfig}
			open={openBuscador}
			setOpen={setOpenBuscador}
			titulo={
				<HeaderBuscador
					cantidadFiltrosAplicados={cantidadFiltrosAplicados}
					inputBusqueda={inputBusqueda}
					setAbrirFiltros={setAbrirFiltros}
					setInputBusqueda={setInputBusqueda}
				/>
			}
		>
			<Busqueda
				cantidadFiltrosAplicados={cantidadFiltrosAplicados}
				debouncedInput={debouncedInput}
				estadoInicialFiltros={estadoInicialFiltros}
				resultadosBusqueda={resultadosBusqueda}
				setFiltrosBusqueda={setFiltrosBusqueda}
				setInputBusqueda={setInputBusqueda}
				setOpenBuscador={setOpenBuscador}
			/>

			<DrawerFiltros open={abrirFiltros}>
				<Filtros
					cantidadFiltrosAplicados={cantidadFiltrosAplicados}
					filtrosBusqueda={filtrosBusqueda}
					restablecerFiltros={restablecerFiltros}
					setAbrirFiltros={setAbrirFiltros}
					setFiltrosBusqueda={setFiltrosBusqueda}
				/>
			</DrawerFiltros>
		</Drawer>
	);
};
