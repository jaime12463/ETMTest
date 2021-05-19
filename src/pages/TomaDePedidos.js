import { useEffect, useState } from "react";
import { CssBaseline, Grid, Container, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import InputField from "../components/InputField";
import { TableInfo } from "../components/TableInfo";
import { DATA } from "../utils/constants";
import { FormAddProduct } from "../components/FormAddProduct";

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
    precio: "",
  });
  const [pedido, setPedido] = useState([]);
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

  const handleFocusProduct = ({ producto, unidades, precio }) => {
    const auxiliar = pedido.find(
      (eleccion) => eleccion.producto === parseInt(producto, 10)
    );

    !auxiliar
      ? setFocusProduct({ producto, unidades, precio })
      : setFocusProduct({ ...auxiliar });
  };

  const handleIncrementValue = ({ target: { value } }) => {
    setFocusProduct({ ...focusProduct, unidades: value });
  };

  const handleAddToPedido = (e) => {
    e.preventDefault();

    parseInt(focusProduct.unidades, 10) > 0 &&
      setPedido([
        ...pedido,
        {
          producto: parseInt(focusProduct.producto, 10),
          unidades: parseInt(focusProduct.unidades, 10),
          precio:
            parseInt(focusProduct.precio, 10) *
            parseInt(focusProduct.unidades, 10),
        },
      ]);
    setFocusProduct({ producto: "", unidades: "", precio: "" });
  };

  console.log(pedido);
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

            <FormAddProduct
              handleAddToPedido={handleAddToPedido}
              focusProduct={focusProduct}
              handleIncrementValue={handleIncrementValue}
            />

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
