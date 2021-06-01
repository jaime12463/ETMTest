import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useAppContext } from "context/AppContext";
import { useTranslation } from "react-i18next";
import LogoFemsa from "assests/images/hdpi_logo_client.png";
import routes from "routes"

export default function Splash() {
  let history = useHistory();
  const { t } = useTranslation();
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle(t('titulos.bienvenido'));
  }, []);

  const handleRedirect = () => {
    history.push(routes.ingresarpedido);
  };

  return (
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

  );
}
