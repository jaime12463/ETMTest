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
  console.log(productoActual, "este es");
  const dispatch = useAppDispatch();
  const agregarProductoAlPedidoCliente = useCallback(
    ({ codigoCliente, unidades, subUnidades, codigoProducto }: any) => {
      console.log(codigoCliente, "codigo cliente este es");
      console.log(unidades, "unidades este es");
      console.log(subUnidades, "subunidades este es");
      if (unidades > 0 || subUnidades > 0) {
        dispatch(
          agregarProductoAlPedidoDelCliente({
            productoPedido: {
              codigoProducto: codigoProducto.split(" ")[0],
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
            codigoProducto: codigoProducto.split(" ")[0],
            codigoCliente: codigoCliente,
          })
        );
      }
      setProductoActual({
        codigoProducto: "",
        unidades: 0,
        subUnidades: 0,
        precioConImpuestoUnidad: 0,
        precioConImpuestoSubunidad: 0,
      });
      setValue("codigoProducto", "")
      setValue("unidades", "")
      setValue("subUnidades", "")
    },
    [productoActual]
  );
  return agregarProductoAlPedidoCliente;
};
