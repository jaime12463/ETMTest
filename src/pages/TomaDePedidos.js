import { useEffect, useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import InputField from "../components/InputField";
import { TableInfo } from "../components/TableInfo";
import { AppContext } from "../context/AppContext";
import { DATA } from "../utils/constants";
import { FormAddProduct } from "../components/FormAddProduct";
import CardPedido from "../components/CardPedido";

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
  const context = useContext(AppContext);
  const [db, setDb] = useState({});
  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState(null);
  const [existeCliente, setExisteCliente] = useState(-1);
  const [focusProduct, setFocusProduct] = useState({
    producto: "",
    unidades: "",
    precio: "",
  });
  //const [pedido, context.setlistaProductosPedido] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    context.setTitle("Ingreso de Pedido");
    // Hago la peticion rest
    setDb(DATA);
    // eslint-disable-next-line
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
    setFocusProduct({ producto: "", unidades: "", precio: "" });
    context.setlistaProductosPedido([]);
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
            element.Precios.filter(
              (producto) =>
                producto.Codigoproducto.substr(1, value.length) === value
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
    const auxiliar = context.listaProductosPedido.find(
      (eleccion) => eleccion.producto === parseInt(producto, 10)
    );

    !auxiliar
      ? setFocusProduct({ producto, unidades, precio })
      : setFocusProduct({ ...auxiliar, precio });
  };

  const handleIncrementValue = ({ target: { value } }) => {
    setFocusProduct({ ...focusProduct, unidades: value });
  };

  const handleAddToPedido = (e) => {
    e.preventDefault();

    const result = context.listaProductosPedido.filter(
      (elem) => elem.producto !== parseInt(focusProduct.producto, 10)
    );
    console.log(focusProduct);

    context.setlistaProductosPedido([
      ...result,
      {
        producto: parseInt(focusProduct.producto, 10),
        unidades: parseInt(focusProduct.unidades, 10),
        precio:
          parseFloat(focusProduct.precio, 10).toFixed(2) *
          parseFloat(focusProduct.unidades, 10).toFixed(2),
      },
    ]);
    setFocusProduct({ producto: "", unidades: "", precio: "" });
  };

  console.log(focusProduct.producto);
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
            El cliente no tiene portafolio informado
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
                  autoFocus={productos && !focusProduct.producto}
                />
              </Grid>
            </div>

            <FormAddProduct
              handleAddToPedido={handleAddToPedido}
              focusProduct={focusProduct}
              handleIncrementValue={handleIncrementValue}
              autoFocus={focusProduct.producto !== ""}
            />

            <TableInfo
              headers={["Producto", "Precio"]}
              data={productos}
              onClick={handleFocusProduct}
            />

            {context.listaProductosPedido.length > 0 && (
              <CardPedido pedido={context.listaProductosPedido} />
            )}
          </div>
        )
      )}
    </Container>
  );
}
