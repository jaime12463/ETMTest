import { useCallback } from "react";
import { useAppDispatch } from "redux/hooks";
import {
  agregarProductoAlPedidoDelCliente,
  borrarProductoDelPedidoDelCliente,
} from "redux/features/pedidoActual/pedidoActualSlice";

export const useAgregarProductoAlPedidoCliente = (
  productoActual: any,
  setProductoActual: any,
  setValue: any
) => {
  const dispatch = useAppDispatch();
  const agregarProductoAlPedidoCliente = useCallback(
    ({ codigoCliente, unidades, subUnidades, codigoProductoConNombre }: any) => {
      if (unidades > 0 || subUnidades > 0) {
        dispatch(
          agregarProductoAlPedidoDelCliente({
            productoPedido: {
              codigoProductoConNombre: codigoProductoConNombre,
              unidades: unidades !== "" ? parseInt(unidades) : 0,
              subUnidades: subUnidades !== "" ? parseInt(subUnidades) : 0,
              total:
                productoActual.precioConImpuestoUnidad * unidades +
                productoActual.precioConImpuestoSubunidad * subUnidades,
            },
            codigoCliente: codigoCliente,
          })
        );
      } else {
        dispatch(
          borrarProductoDelPedidoDelCliente({
            codigoProductoConNombre: codigoProductoConNombre,
            codigoCliente: codigoCliente,
          })
        );
      }
      setProductoActual({
        codigoProductoConNombre: "",
        unidades: 0,
        subUnidades: 0,
        precioConImpuestoUnidad: 0,
        precioConImpuestoSubunidad: 0,
      });
      setValue("codigoProductoConNombre", "")
      setValue("unidades", "")
      setValue("subUnidades", "")
    },
    [productoActual]
  );
  return agregarProductoAlPedidoCliente;
};
