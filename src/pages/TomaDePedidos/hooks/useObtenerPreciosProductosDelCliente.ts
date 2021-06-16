import { useCallback } from "react";
import { useAppSelector } from "redux/hooks";
import { selectDatos } from "redux/features/datos/datosSlice";
import { TPreciosProductos, TCliente } from "models";
import { validarFechaVigenciaProducto } from "utils/validaciones";

export const useObtenerPreciosProductosDelCliente = () => {
  const { datos } = useAppSelector(selectDatos);
  const obtenerPreciosProductosDelCliente = useCallback(
    (clienteEncontrado: TCliente): TPreciosProductos => {
      const preciosProductosDelCliente: TPreciosProductos = clienteEncontrado.portafolio
        .filter((producto) => {
          if (
            validarFechaVigenciaProducto(
              producto.precios,
              clienteEncontrado.fechasEntrega
            )
          )
            return producto;
        })
        .map((productoFiltrado) => {
          return {
            ...productoFiltrado,
            nombre: datos.productos[productoFiltrado.codigoProducto].nombre,
            presentacion:
              datos.productos[productoFiltrado.codigoProducto].presentacion,
          };
        });
      return preciosProductosDelCliente;
    },
    [datos]
  );
  return obtenerPreciosProductosDelCliente;
};
