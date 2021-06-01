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
  const { setlistaProductosPedido, listaProductosPedido, setTitle } = useAppContext();
  const [db, setDb] = useState<TCliente[]>([]);
  const [cliente, setCliente] = useState<string>("");
  const [precios, setPrecios] = useState<TPrecio[] | []>([]);
  const [existeCliente, setExisteCliente] = useState<boolean>(false);
  const [focusProduct, setFocusProduct] = useState<TProductoSolicitado>({
    producto: "",
    unidades: 0,
    precio: 0,
  });
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTitle(t('titulos.ingresoPedido'));
    setDb(DATA);
  }, []);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    setCliente(currentTarget.value);
    setPrecios([]);
    setExisteCliente(false);
    setFocusProduct({ producto: "", unidades: 0, precio: 0 });
    setlistaProductosPedido([]);
  };

  const handleSearchProducts = (e: React.FormEvent) => {
    e.preventDefault();
    db.find((element) => {
      if (element.CodigoCliente === cliente) setPrecios(element.Precios);
      else setPrecios([]);
    });
  };

  const handleFindOneProduct = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
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

  const handleFocusProduct = ({ producto, unidades, precio }: TProductoSolicitado) => {
    const newFocusProduct = listaProductosPedido.find(
      (eleccion) => eleccion.producto === producto
    );

    if (!newFocusProduct) setFocusProduct({ producto, unidades: 0, precio });
    else setFocusProduct({ ...newFocusProduct, precio });
  };

  const handleIncrementValue = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    setFocusProduct({ ...focusProduct, unidades: parseInt(value, 10) });
  };

  const handleAddToPedido = (e: React.FormEvent) => {
    e.preventDefault();

    const producto = listaProductosPedido.filter(
      (elem) => elem.producto !== focusProduct.producto
    );

    if (focusProduct.unidades > 0) {
      setlistaProductosPedido([
        ...producto,
        {
          producto: focusProduct.producto,
          unidades: focusProduct.unidades,
          precio: focusProduct.precio * focusProduct.unidades,
        },
      ])
    } else setlistaProductosPedido([
      ...producto.filter((i) => i.producto !== focusProduct.producto),
    ]);
    setFocusProduct({ producto: "", unidades: 0, precio: 0 });
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
            <Grid item xs={12} sm={12}>
              <InputField
                label={t('general.cliente')}
                onChange={handleChangeCliente}
                value={cliente}
              />
            </Grid>
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
                <Grid item xs={12} sm={12}>
                  <InputField
                    label={t('general.buscar')}
                    onChange={handleFindOneProduct}
                    autoFocus={precios && !focusProduct.producto}
                  />
                </Grid>
              </Grid>
            </div>

            <FormAddProduct
              handleAddToPedido={handleAddToPedido}
              focusProduct={focusProduct}
              handleIncrementValue={handleIncrementValue}
            />

            <TableInfo
              headers={[t('general.producto'), t('general.precio')]}
              precios={precios}
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
