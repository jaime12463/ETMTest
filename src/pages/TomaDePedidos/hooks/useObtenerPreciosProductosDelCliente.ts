import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { selectDatos } from "redux/features/datos/datosSlice";
import { TPreciosProductos, TCliente } from "models";
import { validarFechaVigenciaProducto } from "utils/validaciones";

export const useObtenerPreciosProductosDelCliente = () => {
  const { datos } = useAppSelector(selectDatos);
  const obtenerPreciosProductosDelCliente = useCallback(
    (clienteEncontrado: TCliente): TPreciosProductos => {
      const preciosProductosDelCliente: TPreciosProductos = [];
      clienteEncontrado.portafolio.forEach((productoPortafolio) => {
        const productoEncontrado =
          datos.productos[productoPortafolio.codigoProducto];
        if (
          productoEncontrado &&
          validarFechaVigenciaProducto(
            productoPortafolio.precios,
            clienteEncontrado.fechasEntrega
          )
        ) {
          preciosProductosDelCliente.push({
            ...productoPortafolio,
            nombre: productoEncontrado.nombre,
            presentacion: productoEncontrado.presentacion,
          });
        }
      });
      return preciosProductosDelCliente;
    },
    [datos]
  );
  return obtenerPreciosProductosDelCliente;
};
