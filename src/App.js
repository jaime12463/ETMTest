import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputField from "./components/InputField";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState([]);
  const classes = useStyles();

  const handleChangeCliente = ({ target }) => {
    setCliente(target.value);
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();

    console.log("busco productos");
  };

  console.log(cliente);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSearchProducts}
        >
          <Grid container spacing={1}>
            <InputField
              label="Cliente"
              xs={12}
              sm={6}
              onChange={handleChangeCliente}
              value={cliente}
            />
          </Grid>
        </form>
      </div>
      {/* <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <InputField label="Buscar" xs={12} sm={12} />
          </Grid>
        </form>
      </div>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <InputField label="Producto" xs={12} sm={6} />
            <InputField label="Unidades" xs={12} sm={6} type="number" />
          </Grid>
        </form>
      </div> */}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
