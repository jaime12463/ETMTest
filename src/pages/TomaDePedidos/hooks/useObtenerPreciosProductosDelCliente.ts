import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { selectDatos } from "redux/features/datos/datosSlice";
import { TPreciosProductos, TCliente, TPortafolio } from "models";
import { validarFechaVigenciaProducto } from "utils/validaciones";

export const useObtenerPreciosProductosDelCliente = () => {
  const { datos } = useAppSelector(selectDatos);
  const obtenerPreciosProductosDelCliente = useCallback(
    (clienteEncontrado: TCliente): TPreciosProductos => {
      const preciosProductosDelCliente: TPreciosProductos = clienteEncontrado.portafolio.filter(
        (producto) =>  
        { 
            if (validarFechaVigenciaProducto( producto.precios,clienteEncontrado.fechasEntrega)) return producto; 
        }).map(
                (productoFiltrado) => 
                {
                    return {
                    ...productoFiltrado, 
                    "nombre": datos.productos[productoFiltrado.codigoProducto].nombre, 
                    "presentacion": datos.productos[productoFiltrado.codigoProducto].presentacion };
                }
        );
      return preciosProductosDelCliente;
    },
    [datos]
  );
  return obtenerPreciosProductosDelCliente;
};
