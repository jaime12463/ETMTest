import React from "react";
import { TableContainer } from "@material-ui/core";
import { TPreciosProductos, TProductoPedidoConPrecios } from "models";
import usarEstilos from "./usarEstilos";
import { Tabla } from "components/Table/Tabla";
import { Encabezado } from "components/Table/Encabezado";
import { Cuerpo } from "components/Table/Cuerpo";

export type Props = {
  titulos: string[];
  preciosProductos: TPreciosProductos;
  asignarProductoActual: (producto: TProductoPedidoConPrecios) => void;
};

const TablaProductos = ({
  titulos,
  preciosProductos,
  asignarProductoActual,
}: Props) => {
  const estilos = usarEstilos();

  return (
    <TableContainer className={estilos.container}>
      <Tabla size="small" stickyHeader>
        <Encabezado atributos={titulos} estilos={estilos} />
        <Cuerpo
          asignarProductoActual={asignarProductoActual}
          estilos={estilos}
          filas={preciosProductos}
        />
      </Tabla>
    </TableContainer>
  );
};

export default TablaProductos;
