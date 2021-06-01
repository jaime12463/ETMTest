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
import { TCliente, TPrecio, TProductoSolicitado } from "models";
import Scaffold from "components/Scaffold";

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
  const { setlistaProductosPedido, listaProductosPedido } = useAppContext();
  const [db, setDb] = useState<TCliente[]>([]);
  const [cliente, setCliente] = useState<string>("");
  const [precios, setPrecios] = useState<TPrecio[] | []>([]);
  const [existeCliente, setExisteCliente] = useState<boolean>(false);
  const [focusProduct, setFocusProduct] = useState<TProductoSolicitado>({
    producto: "",
    unidades: 0,
    precio: 0,
  });
  const unidadRef = useRef(null);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setDb(DATA);
  }, []);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = ({ target }: any) => {
    setCliente(target.value);
    setPrecios([]);
    setExisteCliente(false);
    setFocusProduct({ producto: "", unidades: 0, precio: 0 });
    setlistaProductosPedido([]);
  };

  const handleSearchProducts = (e: any) => {
    e.preventDefault();
    db.find((element) => {
      if (element.CodigoCliente === cliente) setPrecios(element.Precios);
      else setPrecios([]);
    });
  };

  const handleFindOneProduct = ({ target: { value } }: any) => {
    db.find((element) => {
      if (element.CodigoCliente === cliente) {
        const nuevosPrecios = element.Precios.filter(
          (producto) => producto.Codigoproducto.substr(0, value.length) === value
        );
        setPrecios(nuevosPrecios);
      } else setPrecios([]);
    });

    if (value === "") {
      db.find((element) => {
        if (element.CodigoCliente === cliente) setPrecios(element.Precios);
        else setPrecios([]);
      });
    }
  };

  const handleFocusProduct = ({ producto, unidades, precio }: any) => {
    const newFocusProduct = listaProductosPedido.find(
      (eleccion) => eleccion.producto === producto
    );

    if (!newFocusProduct) setFocusProduct({ producto, unidades: 0, precio });
    else setFocusProduct({ ...newFocusProduct, precio });
  };

  const handleIncrementValue = ({ target: { value } }: any) => {
    setFocusProduct({ ...focusProduct, unidades: parseInt(value, 10) });
  };

  const handleAddToPedido = (e: any) => {
    e.preventDefault();

    const producto = listaProductosPedido.filter(
      (elem) => elem.producto !== focusProduct.producto
    );

    if (focusProduct.unidades > 0)
      setlistaProductosPedido([
        ...producto,
        {
          producto: focusProduct.producto,
          unidades: focusProduct.unidades,
          precio: focusProduct.precio * focusProduct.unidades,
        },
      ])
    else setlistaProductosPedido([
      ...producto.filter((i) => i.producto !== focusProduct.producto),
    ]);
    setFocusProduct({ producto: "", unidades: 0, precio: 0 });
  };

  return (
    <Scaffold>
      <Scaffold.Header title={t('titulos.ingresoPedido')}>
        <Scaffold.Header.BackAction />
      </Scaffold.Header>
      <Scaffold.Content>
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
            precios.length > 0 && (
              <div>
                <div className={classes.paper}>
                  <Grid container>
                    <InputField
                      label={t('general.buscar')}
                      size="small"
                      xs={12}
                      sm={12}
                      onChange={handleFindOneProduct}
                      autoFocus={precios && !focusProduct.producto}
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
                  data={precios}
                  onClick={handleFocusProduct}
                />

                {listaProductosPedido.length > 0 && (
                  <CardPedido pedido={listaProductosPedido} />
                )}
              </div>
            )
          )}
        </Container>
      </Scaffold.Content>
    </Scaffold>
  );
}
