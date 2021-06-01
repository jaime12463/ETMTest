import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import LogoFemsa from "assests/images/hdpi_logo_client.png";
import routes from "routes"
import Scaffold from "components/Scaffold";

export default function Splash() {
  let history = useHistory();
  const { t } = useTranslation();

  const handleRedirect = () => {
    history.push(routes.ingresarpedido);
  };

  return (
    <Scaffold>
      <Scaffold.Header title={t('titulos.bienvenido')} />
      <Scaffold.Content>
        <div style={{ width: "100%" }}>
          <Box display="flex" justifyContent="center">
            <img
              src={LogoFemsa}
              onClick={handleRedirect}
              style={{ cursor: "pointer", marginTop: "calc(100vh - 73vh)" }}
              alt="logo"
            ></img>
          </Box>
        </div>
      </Scaffold.Content>
      <Scaffold.Footer />
    </Scaffold>
  );
}
