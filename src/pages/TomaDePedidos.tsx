import React, { useEffect, useState, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import InputField from "components/InputField";
import { TableInfo } from "components/TableInfo";
import { useAppContext } from "context/AppContext";
import { DATA } from "utils/constants";
import { FormAddProduct } from "components/FormAddProduct";
import CardPedido from "components/CardPedido";
import { useTranslation } from "react-i18next";

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

interface ICliente {
  CodigoCliente: string;
  Precios: Array<any>;
}
interface IProducto {
  producto: string;
  unidades: string;
  precio: string;
}

export default function TomaDePedidos() {
  const {
    setTitle,
    setlistaProductosPedido,
    listaProductosPedido,
  } = useAppContext();
  const [db, setDb] = useState<ICliente[]>([]);
  const [cliente, setCliente] = useState<string>("");
  const [productos, setProductos] = useState<any[] | null>(null);
  const [existeCliente, setExisteCliente] = useState<boolean | number>(-1);
  const [focusProduct, setFocusProduct] = useState<IProducto>({
    producto: "",
    unidades: "",
    precio: "",
  });
  const unidadRef = useRef(null);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTitle(t('titulos.ingresoPedido'));
    setDb(DATA);
  }, []);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setExisteCliente(true);
    }
    if (existeCliente === -1) {
      setExisteCliente(false);
    }
  }, [productos, existeCliente]);

  const handleChangeCliente = ({ target }: any) => {
    setCliente(target.value);
    setProductos(null);
    setExisteCliente(-1);
    setFocusProduct({ producto: "", unidades: "", precio: "" });
    setlistaProductosPedido([]);
  };

  const handleSearchProducts = (e: any) => {
    e.preventDefault();
    db.find((element) =>
      element.CodigoCliente === cliente
        ? setProductos(element.Precios)
        : setProductos([])
    );
  };

  const handleFindOneProduct = ({ target: { value } }: any) => {
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

  const handleFocusProduct = ({ producto, unidades, precio }: any) => {
    const auxiliar = listaProductosPedido.find(
      (eleccion) => eleccion.producto === parseInt(producto, 10)
    );

    !auxiliar
      ? setFocusProduct({ producto, unidades: "", precio })
      : setFocusProduct({ ...auxiliar, precio });
  };

  const handleIncrementValue = ({ target: { value } }: any) => {
    setFocusProduct({ ...focusProduct, unidades: value });
  };

  const handleAddToPedido = (e: any) => {
    e.preventDefault();

    const result = listaProductosPedido.filter(
      (elem) => elem.producto !== parseInt(focusProduct.producto, 10)
    );

    parseInt(focusProduct.unidades, 10) > 0
      ? setlistaProductosPedido([
          ...result,
          {
            producto: parseInt(focusProduct.producto, 10),
            unidades: parseInt(focusProduct.unidades, 10),
            precio:
              parseFloat(focusProduct.precio) *
              parseFloat(focusProduct.unidades),
          },
        ])
      : setlistaProductosPedido([
          ...result.filter((i) => i.producto !== focusProduct.producto),
        ]);
    setFocusProduct({ producto: "", unidades: "", precio: "" });
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
              label={t('general.cliente')}
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
            {t('advertencias.clienteNoPortafolio')}
          </Alert>
        </div>
      ) : (
        productos && (
          <div>
            <div className={classes.paper}>
              <Grid container>
                <InputField
                  label={t('general.buscar')}
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
              headers={[t('general.producto'), t('general.precio')]}
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
