import { TPrecio, TFechaEntrega } from "models";

export const validarFechaVigenciaProducto = (
  preciosProductos: TPrecio[],
  fechasEntrega: TFechaEntrega[]
) => {
  const { vigenciaInicioPrecio, vigenciaFinPrecio } = preciosProductos[0];
  const { fechaEntrega } = fechasEntrega[0];

  if (
    new Date(vigenciaInicioPrecio) <= new Date(fechaEntrega) &&
    new Date(vigenciaFinPrecio) >= new Date(fechaEntrega)
  ) {
    return true;
  }

  return false;
};
