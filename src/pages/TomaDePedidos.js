import { useEffect, useState } from "react";
import { CssBaseline, Grid, Container, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import InputField from "../components/InputField";
import { TableInfo } from "../components/TableInfo";
import { DATA } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sectionAlert: {
    marginTop: "1rem",
  },
}));

export default function TomaDePedidos() {
  const [db, setDb] = useState({});
  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState(null);
  const [existeCliente, setExisteCliente] = useState(-1);
  const [focusProduct, setFocusProduct] = useState({
    producto: "",
    unidades: "",
  });
  const classes = useStyles();

  useEffect(() => {
    // Hago la peticion rest
    setDb(DATA);
  }, []);

  useEffect(() => {
    productos &&
      (productos.length > 0
        ? setExisteCliente(true)
        : existeCliente === -1 && setExisteCliente(false));
  }, [productos, existeCliente]);

  const handleChangeCliente = ({ target }) => {
    setCliente(target.value);
    setProductos(null);
    setExisteCliente(-1);
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
    db.find((element) =>
      element.CodigoCliente === cliente
        ? setProductos(
            element.Precios.filter((producto) =>
              producto.Codigoproducto.includes(value)
            )
          )
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

  console.log(existeCliente);
  console.log(productos);
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
              size="small"
              xs={6}
              sm={6}
              onChange={handleChangeCliente}
              value={cliente}
            />
          </Grid>
        </form>
      </div>
      {!existeCliente ? (
        <div className={classes.sectionAlert}>
          <Alert variant="filled" severity="warning">
            Cliente no encontrado
          </Alert>
        </div>
      ) : (
        productos && (
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
            <div className={classes.paper}>
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
        )
      )}
    </Container>
  );
}
