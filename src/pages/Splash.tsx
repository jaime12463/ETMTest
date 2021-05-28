import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LogoFemsa from "../assests/images/hdpi_logo_client.png";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function Splash() {
  let history = useHistory();
  const context = useContext(AppContext);

  useEffect(() => {
    //-------------context.setTitle("Bienvenido");
    // eslint-disable-next-line
  }, []);

  const handleRedirect = () => {
    history.push("/ingresarpedido");
  };

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center">
        <img
          src={LogoFemsa}
          onClick={handleRedirect}
          style={{ cursor: "pointer", marginTop: "calc(100vh - 73vh)"}}
          alt="logo"
        ></img>
      </Box>
    </div>
  );
}
