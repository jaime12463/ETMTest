import { useEffect, useState, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import InputField from "../components/InputField";
import { TableInfo } from "../components/TableInfo";
import { useAppContext } from "../context/AppContext";
import { DATA, URL_API } from "../utils/constants";
import { FormAddProduct } from "../components/FormAddProduct";
import CardPedido from "../components/CardPedido";
import axios from "axios";
import { useForkRef } from "@material-ui/core";

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
  const { setTitle, setlistaProductosPedido, listaProductosPedido } = useAppContext();
  const [db, setDb] = useState({});
  const [cliente, setCliente] = useState<string>("");
  const [productos, setProductos] = useState<any[]>([]);
  const [existeCliente, setExisteCliente] = useState<boolean>(false);
  const [focusProduct, setFocusProduct] = useState({
    producto: "",
    unidades: "",
    precio: "",
  });
  const unidadRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    setTitle("Ingreso de Pedido");

    const fetchData = async () => {
      const response = await obtenerDB();
      setDb(response.data);
    };

    fetchData(); //descomentar esta linea si se usa axios y comentar la linea setDb(DATA)

    //setDb(DATA);
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
      if (productos.length > 0) setExisteCliente(true);
      else if (!existeCliente) setExisteCliente(false);
  }, [productos, existeCliente]);

  const handleChangeCliente = ({ target }) => {
    setCliente(target.value);
    setProductos(null);
    setExisteCliente(-1);
    setFocusProduct({ producto: "", unidades: "", precio: "" });
    setlistaProductosPedido([]);
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
              producto.Codigoproducto.substr(0, value.length) === value
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
    const auxiliar = listaProductosPedido.find(
      (eleccion) => eleccion.producto === parseInt(producto, 10)
    );

    !auxiliar
      ? setFocusProduct({ producto, unidades: "", precio })
      : setFocusProduct({ ...auxiliar, precio });
  };

  const handleIncrementValue = ({ target: { value } }) => {
    setFocusProduct({ ...focusProduct, unidades: value });
  };

  const handleAddToPedido = (e) => {
    e.preventDefault();

    const result = listaProductosPedido.filter(
      (elem) => elem.producto !== parseInt(focusProduct.producto, 10)
    );

    parseInt(focusProduct.unidades, 10) > 0? setlistaProductosPedido([
      ...result,
      {
        producto: parseInt(focusProduct.producto, 10),
        unidades: parseInt(focusProduct.unidades, 10),
        precio:
          parseFloat(focusProduct.precio, 10).toFixed(2) *
          parseFloat(focusProduct.unidades, 10).toFixed(2),
      },
    ]): setlistaProductosPedido([...result.filter((i)=> i.producto!==focusProduct.producto)]);
    setFocusProduct({ producto: "", unidades: "", precio: "" });

  };

  console.log("TomaDePedidosInputRef=" + unidadRef)
  console.log("TomaDePedidosInputRef.current=" + unidadRef.current)
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
              inputRef={unidadRef}
            />

            <TableInfo
              headers={["Producto", "Precio"]}
              data={productos}
              onClick={handleFocusProduct}
            />

            {listaProductosPedido.length > 0 && (
              <CardPedido pedido={listaProductosPedido} />
            )}
          </div>
        )
      )}
    </Container>
  );
}
function obtenerDB() {
  throw new Error("Function not implemented.");
}

