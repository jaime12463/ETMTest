import React from "react";
import { Box } from "@material-ui/core";
import Footers from "assests/images/hdpi_logo_soft_hasar.png";
import usarEstilos from "./usarEstilos";
import EncabezadoCascaron from "./EncabezadoCascaron";

type PropsCascaron = {
  children: React.ReactNode,
  titulo: string,
  esConFechaHaciaAtras?: boolean,
  esConLogoInferior?: boolean,
};

const Cascaron = ({ esConFechaHaciaAtras = true, esConLogoInferior = false, titulo, children }: PropsCascaron) => {
  const estilos = usarEstilos();
  return (
    <div className={estilos.root}>
      <EncabezadoCascaron
        titulo={titulo}
        esConFechaHaciaAtras={esConFechaHaciaAtras}
      />
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
      {esConLogoInferior && (
        <Box display="flex" justifyContent="center">
          <div
            style={{
              background: `url(${Footers}) no-repeat`,
              height: "75px",
              width: "300px",
              position: "absolute",
              bottom: "0px",
            }}
          ></div>
        </Box>
      )}
    </div>
  );
};

export default Cascaron;
