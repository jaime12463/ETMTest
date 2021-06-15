import { useCallback } from "react";
import { useAppSelector } from "redux/hooks";
import { selectDatos } from "redux/features/datos/datosSlice";
import { TPreciosProductos, TCliente } from "models";
import { useObtenerPreciosProductosDelCliente } from ".";

export const useBuscarPreciosProductos = (
  preciosProductos: any,
  setPreciosProductos: any
) => {
  const { datos } = useAppSelector(selectDatos);
  const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
  const buscarPreciosProductos = useCallback(
    ({ codigoCliente, productoABuscar }: any) => {
      const preciosProductosFiltrados = preciosProductos.filter(
        (precioProducto: any) =>
          precioProducto.codigoProducto.includes(productoABuscar) ||
          precioProducto.nombre
            .toLowerCase()
            .includes(productoABuscar.toLowerCase())
      );
      if (productoABuscar === "") {
        const clienteEncontrado: TCliente | undefined =
          datos.clientes[codigoCliente];
        if (clienteEncontrado) {
          const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
            clienteEncontrado
          );
          setPreciosProductos(preciosProductosDelCliente);
        }
      } else setPreciosProductos(preciosProductosFiltrados);
    },
    [preciosProductos]
  );
  return buscarPreciosProductos;
};