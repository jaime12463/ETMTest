import { TPrecio, TFechaEntrega, TConfiguracionPedido } from "models";

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

export const validarUnidadesMinimasProducto = (
  unidades: number,
  configuracionPedido: TConfiguracionPedido
) => {
  const { cantidadMaximaUnidades } = configuracionPedido;
  if (cantidadMaximaUnidades) {
    if (unidades > cantidadMaximaUnidades)
      return false;
  }
  return true;
};
