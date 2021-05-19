import { useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";
import Headers from "../assests/images/pop_up_onda.png";
import Footers from "../assests/images/hdpi_logo_soft_hasar.png";

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

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="center"
          style={{
            background: `url(${Headers}) no-repeat`,
            height: "75px",
            width: "430px",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ marginTop: "20px", color: "white" }}
          >
            {context.title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {props.children}
      </Box>
      {context.viewFooter === 0 ? (
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
      ) : null}
    </div>
  );
};

export default Layout;
