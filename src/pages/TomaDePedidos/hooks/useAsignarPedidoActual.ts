import { useCallback } from "react";
import { selectDatos } from "redux/features/datos/datosSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { cambiarClienteActual } from "redux/features/pedidoActual/pedidoActualSlice";
import { TCliente, TPreciosProductos } from "models";
import { useObtenerPreciosProductosDelCliente } from ".";

export const useAsignarPedidoActual = (
  setExisteCliente: any,
  setRazonSocial: any,
  setPreciosProductos: any
) => {
  const { datos } = useAppSelector(selectDatos);
  const dispatch = useAppDispatch();
  const obtenerPreciosProductosDelCliente = useObtenerPreciosProductosDelCliente();
  const asignarPedidoActual = useCallback(
    ({ codigoCliente }: any) => {
      const clienteEncontrado: TCliente | undefined =
        datos.clientes[codigoCliente];
      if (clienteEncontrado) {
        setExisteCliente(true);
        dispatch(cambiarClienteActual({ codigoCliente: codigoCliente }));
        const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(
          clienteEncontrado
        );
        setRazonSocial(clienteEncontrado.detalles.nombreComercial);
        setPreciosProductos(preciosProductosDelCliente);
      } else {
        setExisteCliente(false);
        dispatch(cambiarClienteActual({ codigoCliente: "" }));
        setRazonSocial("");
        setPreciosProductos([]);
      }
    },
    [datos]
  );
  return asignarPedidoActual;
};

// CODIGO OBTENER PRECIOS CON FECHAS VALIDAS
// nuevosPrecios = clienteEncontrado.precios.filter(
//   (producto) =>
//     new Date(transformDate(producto.iniVig)) <=
//       new Date(nuevasFechas[0].fechaDeEntrega) &&
//     new Date(transformDate(producto.finVig)) >=
//       new Date(nuevasFechas[0].fechaDeEntrega)
// );