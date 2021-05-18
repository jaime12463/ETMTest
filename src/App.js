import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputField from "./components/InputField";
import { DATA } from "./utils/constants";
import { TableInfo } from "./components/TableInfo";
import { Alert, useAutocomplete } from "@material-ui/lab";
import { useFormState } from "react-hook-form";


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
    marginTop: theme.spacing(1),
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
  const [db, setDb] = useState(DATA);
  const [cliente, setCliente] = useState("");
  const [clienteExiste, setclienteExist] = useState(true);
  const [productos, setProductos] = useState(null);
  const [productsFilter, setProductsFilter] = useState([]);
  const [focusProduct, setFocusProduct] = useState({
    producto: "",
    unidades: "",
  });

  const classes = useStyles();

  const handleChangeCliente = ({ target }) => {
    setCliente(target.value);
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();
    db.find((element) =>
      element.CodigoCliente === cliente
        ? setProductos(element.Precios)
        : setProductos(null)
    );
      if (!productos){setclienteExist(false)}
  };

  const handleFindOneProduct = ({ target: { value } }) => {

    db.find((element) =>
      element.CodigoCliente === cliente
        ? setProductos(element.Precios.filter((producto) => producto.Codigoproducto.includes(value)))
        : setProductos([])
    );

    value === "" &&
      db.find((element) =>
        element.CodigoCliente === cliente
          ? setProductos(element.Precios)
          : setProductos([])
      );
  };

  const handleFocusProduct = ({ producto, unidades }) => {
    setFocusProduct({ producto, unidades });
  };

  const handleIncrementValue = ({ target: { value } }) => {
    setFocusProduct({ ...focusProduct, unidades: value });
  };
  console.log("Productos="+productos);
  console.log("Hay Clientes?= "+clienteExiste);
  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSearchProducts}
        >
          <Grid container>
            <InputField
              label="Cliente"
              size="small"
              xs={12}
              sm={6}
              onChange={handleChangeCliente}
              value={cliente}
            />
          </Grid>
        </form>
      </div>
      {productos ? (
        <div>
          <div className={classes.paper}>
            <Grid container>
              <InputField
                label="Buscar"
                size="small"
                xs={12}
                sm={12}
                onChange={handleFindOneProduct}
              />
            </Grid>
          </div>
          <div className={classes.paper} >
            <form className={classes.form} noValidate>
              <Grid container spacing={1}>
                <InputField
                  label="Producto"
                  size="small"
                  xs={6}
                  sm={6}
                  value={focusProduct.producto}
                  disabled
                />
                <InputField
                  label="Unidades"
                  size="small"
                  xs={6}
                  sm={6}
                  min={0}
                  type="number"
                  value={focusProduct.unidades}
                  onChange={handleIncrementValue}
                />
              </Grid>
            </form>
          </div>
          <TableInfo
            headers={["Producto", "Precio"]}
            data={productos}
            onClick={handleFocusProduct}
            />
        </div>
      ) : !clienteExiste && <Alert variant="filled" severity="warning">Cliente no encontrado</Alert>}
    </Container>
  );
}
