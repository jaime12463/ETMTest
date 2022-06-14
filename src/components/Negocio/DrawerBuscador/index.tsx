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
		if (abrirFiltros) {
			if (!resultadosBusqueda.length) {
				restablecerFiltros();
				return;
			}

			const nuevosFiltros = obtenerFiltrosCliente(resultadosBusqueda);

			const filtrosAplicados = Object.entries(filtrosBusqueda).reduce(
				(acc, [key, arr]) => {
					const arrayFiltros: number[] = [];

					arr.forEach(
						(item: ItemsBusqueda) => item.checked && arrayFiltros.push(item.id)
					);

					return {
						...acc,
						[key]: arrayFiltros,
					};
				},
				{} as {[key: string]: number[]}
			);

			setFiltrosBusqueda({
				envases: nuevosFiltros.envases.map((envase) =>
					filtrosAplicados.envases.includes(envase.id)
						? {...envase, checked: true}
						: envase
				),
				familias: nuevosFiltros.familias.map((familia) =>
					filtrosAplicados.familias.includes(familia.id)
						? {...familia, checked: true}
						: familia
				),
				sabores: nuevosFiltros.sabores.map((sabor) =>
					filtrosAplicados.sabores.includes(sabor.id)
						? {...sabor, checked: true}
						: sabor
				),
				marcas: nuevosFiltros.marcas.map((marca) =>
					filtrosAplicados.marcas.includes(marca.id)
						? {...marca, checked: true}
						: marca
				),
				medidas: nuevosFiltros.medidas.map((medida) =>
					filtrosAplicados.medidas.includes(medida.id)
						? {...medida, checked: true}
						: medida
				),
			});
		}
	}, [abrirFiltros]);

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
				estadoInicialFiltros={estadoInicialFiltros}
				resultadosBusqueda={resultadosBusqueda}
				setFiltrosBusqueda={setFiltrosBusqueda}
				setInputBusqueda={setInputBusqueda}
				setOpenBuscador={setOpenBuscador}
			/>

			<DrawerFiltros open={abrirFiltros}>
				<Filtros
					cantidadFiltrosAplicados={cantidadFiltrosAplicados}
					estadoInicialFiltros={estadoInicialFiltros}
					filtrosBusqueda={filtrosBusqueda}
					restablecerFiltros={restablecerFiltros}
					resultadosBusqueda={resultadosBusqueda}
					setAbrirFiltros={setAbrirFiltros}
					setFiltrosBusqueda={setFiltrosBusqueda}
				/>
			</DrawerFiltros>
		</Drawer>
	);
};
