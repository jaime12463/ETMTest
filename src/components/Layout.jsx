import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";
import Headers from "../assests/images/pop_up_onda.png";
import Footers from "../assests/images/hdpi_logo_soft_hasar.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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

const Layout = (props) => {
  const classes = useStyles();
  const context = useContext(AppContext);

  let history = useHistory();

  const handleClickChangeRoute = () => {
    context.title === "Ingreso de Pedido"
      ? history.push("/")
      : history.push("/ingresarpedido");
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
            {context.title !== "Bienvenido" && (
              <IconButton size="small" onClick={handleClickChangeRoute}>
                <ArrowBackIcon style={{color:"white"}} />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Typography
              variant="subtitle1"
              style={{ marginTop: "20px", color: "white" }}
            >
              {context.title}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.children}
      </Box>
      {context.title === "Bienvenido" && (
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
