import { TCliente } from "models";
import { useCallback } from "react";
import { useAppSelector } from "redux/hooks";
import { selectDatos } from "redux/features/datos/datosSlice";
import { validarUnidadesMinimasProducto } from "utils/validaciones";
import { useAgregarProductoAlPedidoCliente } from ".";

export const useValidarAgregarProductoAlPedidoCliente = (
  setMostarDialogo: any,
  productoActual: any,
  setProductoActual: any,
  setValue: any
) => {
  const agregarProductoAlPedidoCliente = useAgregarProductoAlPedidoCliente(
    productoActual,
    setProductoActual,
    setValue
  );
  const { datos } = useAppSelector(selectDatos);
  const validarAgregarProductoAlPedidoCliente = useCallback(
    ({ codigoCliente, unidades, subUnidades, codigoProducto }: any) => {
      const clienteEncontrado: TCliente | undefined =
        datos.clientes[codigoCliente];
      if (
        validarUnidadesMinimasProducto(
          unidades,
          clienteEncontrado.configuracionPedido
        )
      )
        agregarProductoAlPedidoCliente({
          codigoCliente,
          unidades,
          subUnidades,
          codigoProducto,
        });
      else setMostarDialogo(true);
    },
    [productoActual]
  );
  return validarAgregarProductoAlPedidoCliente;
};
