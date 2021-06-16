import { TPedidoCliente } from "models";
import { useCallback } from "react";
import { selectPedidoActual } from "redux/features/pedidoActual/pedidoActualSlice";
import { agregarPedidoCliente } from "redux/features/pedidosClientes/pedidosClientesSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export const useAgregarPedidoAlListado = () => {
  const dispatch = useAppDispatch();
  const pedidoActual: TPedidoCliente = useAppSelector(selectPedidoActual);
  const agregarPedidoAlListado = useCallback(() => {
    dispatch(
      agregarPedidoCliente({
        codigoCliente: pedidoActual.codigoCliente,
        productoPedido: pedidoActual.productosPedido,
      })
    );
  }, [pedidoActual]);
  return agregarPedidoAlListado;
};
