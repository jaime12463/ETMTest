import { useCallback } from "react";
import { TProductoPedidoConPrecios } from "models";

//TODO: Esto aun no funciona, pero primero pensar esto tiene que modificar las unidades o subunidades
//sin tener que hacer un enter?
export const useAumentarUnidadesAlProductoActual = (
  productoActual: any,
  setProductoActual: any
) => {
  const aumentarUnidadesAlProductoActual = useCallback(
    ({ unidades, subUnidades }: any) => {
      // const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      // let nuevoProductoActual: TProductoPedidoConPrecios = {
      //   ...productoActual,
      //   unidades: nuevasUnidades,
      // };
      // setProductoActual(nuevoProductoActual);
    },
    [productoActual]
  );
  return aumentarUnidadesAlProductoActual;
};
