import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "context/AppContext";
import Headers from "../assests/images/pop_up_onda.png";
import Footers from "../assests/images/hdpi_logo_soft_hasar.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

type LayoutProps = {
  children: any;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paperHeader: {
    width: "100%",
    height: "109px",
    position: "relative",
    background: `url(${Headers}) no-repeat`,
  },
}));

const Layout = (props: LayoutProps) => {
  const classes = useStyles();
  const { title } = useAppContext();
  let history = useHistory();

  const handleClickChangeRoute = () => {
    if (title === "Ingreso de Pedido") history.push("/");
    else history.push("/ingresarpedido");
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          style={{
            background: `url(${Headers}) no-repeat`,
            height: "75px",
            width: "430px",
          }}
        >
          <Grid item xs={2} style={{ marginTop: "17px" }}>
            {title !== "Bienvenido" && (
              <IconButton size="small" onClick={handleClickChangeRoute}>
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Typography
              variant="subtitle1"
              style={{ marginTop: "20px", color: "white" }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.children}
      </Box>
      {title === "Bienvenido" && (
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

export default Layout;
