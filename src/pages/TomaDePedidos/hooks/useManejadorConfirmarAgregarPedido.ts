import { useCallback } from "react";
import { validarUnidadesMinimasProducto } from "utils/validaciones";
import { useAgregarProductoAlPedidoCliente } from ".";

export const useManejadorConfirmarAgregarPedido = (
  setMostarDialogo: any,
  productoActual: any,
  setProductoActual: any,
  setValue: any,
  getValues: any
) => {
  const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
      productoActual,
      setProductoActual,
      setValue
    );
  const manejadorConfirmarAgregarPedido = useCallback(
    (oprimioBotonAceptar: boolean) => {
      if (oprimioBotonAceptar) {
        const {
          codigoCliente,
          unidades,
          subUnidades,
          codigoProducto,
        } = getValues();
        agregarProductoAlPedidoCliente({
          codigoCliente,
          unidades,
          subUnidades,
          codigoProducto,
        });
        setMostarDialogo(false);
      } else setMostarDialogo(false);
    },
    [productoActual]
  );
  return manejadorConfirmarAgregarPedido;
};
