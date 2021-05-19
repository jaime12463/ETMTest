import React, { useEffect, useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputField from "../components/InputField";
import { DATA } from "../utils/constants";
import { TableInfo } from "../components/TableInfo";
import AppContext from '../context/AppContext';

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

export default function TomaDePedidos() {
  const context = useContext(AppContext);
  const [db, setDb] = useState(DATA);
  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [focusProduct, setFocusProduct] = useState({
    producto: "",
    unidades: "",
  });
  const classes = useStyles();


  console.log("Tomade pedidos", context)
useEffect(() => {
    context.setTitle("Ingreso de Pedido");
},[])

  const handleChangeCliente = ({ target }) => {
    setCliente(target.value);
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();

    db.find((element) =>
      element.CodigoCliente === cliente
        ? setProductos(element.Precios)
        : setProductos([])
    );
  };

  const handleFindOneProduct = ({ target: { value } }) => {
    setProductos(
      productos.filter((producto) => producto.Codigoproducto.includes(value))
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

  return (
    <Container component="main" maxWidth="xs">
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
              xs={12}
              sm={6}
              onChange={handleChangeCliente}
              value={cliente}
            />
          </Grid>
        </form>
      </div>
      {productos.length > 0 && (
        <div>
          <div className={classes.paper}>
            <Grid container>
              <InputField
                label="Buscar"
                xs={12}
                sm={12}
                onChange={handleFindOneProduct}
              />
            </Grid>
          </div>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container spacing={1}>
                <InputField
                  label="Producto"
                  xs={12}
                  sm={6}
                  value={focusProduct.producto}
                  disabled
                />
                <InputField
                  label="Unidades"
                  xs={12}
                  sm={6}
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
      )}
    </Container>
  );
}
