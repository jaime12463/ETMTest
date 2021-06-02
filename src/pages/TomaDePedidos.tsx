import React, { useCallback, useEffect, useState } from "react";
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
import { TCliente, TPrecio, TProductoPedido } from "models";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { addProductToOrder, deleteProductToOrder, selectProductsToOrder } from "redux/features/productsToOrder/productsToOrderSlice";
import { selectActualCustumer, setActualCustumer } from "redux/features/actualCustumer/actualCustumerSlice";

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
  const { setTitle } = useAppContext();
  const [db, setDb] = useState<TCliente[]>([]);
  const [precios, setPrecios] = useState<TPrecio[] | []>([]);
  const [existeCliente, setExisteCliente] = useState<boolean>(false);
  const [focusProduct, setFocusProduct] = useState<TProductoPedido>({
    codigoProducto: "",
    unidades: 0,
    precio: 0,
  });
  const dispatch = useAppDispatch();
  const productsToOrder = useAppSelector(selectProductsToOrder);
  const actualCustumer = useAppSelector(selectActualCustumer);

  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTitle(t('titulos.ingresoPedido'));
    setDb(DATA);
  }, [setTitle, t]);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      dispatch(setActualCustumer({ codigoCliente: currentTarget.value }));
      setPrecios([]);
      setExisteCliente(false);
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [dispatch],
  )

  const handleSearchProducts = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      let nuevosPrecios: [] | TPrecio[] = [];
      const clienteEncontrado: TCliente | undefined = db.find(
        (clienteDB) => clienteDB.CodigoCliente === actualCustumer?.codigoCliente
      )
      if (clienteEncontrado) nuevosPrecios = clienteEncontrado.Precios;
      setPrecios(nuevosPrecios);
    },
    [db, actualCustumer],
  )

  const handleFindOneProduct = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      let nuevosPrecios: [] | TPrecio[] = [];
      const clienteEncontrado: TCliente | undefined = db.find(
        (clienteDB) => clienteDB.CodigoCliente === actualCustumer?.codigoCliente
      )
      if (clienteEncontrado && value === "") nuevosPrecios = clienteEncontrado.Precios;
      if (clienteEncontrado && value !== "") {
        nuevosPrecios = clienteEncontrado.Precios.filter(
          (producto) => producto.Codigoproducto.substr(0, value.length) === value
        );
      }
      setPrecios(nuevosPrecios);
    },
    [db, actualCustumer],
  )

  const handleFocusProduct = useCallback(
    ({ codigoProducto, unidades, precio }: TProductoPedido) => {
      let nuevoFocusProducto: TProductoPedido = { codigoProducto, unidades: 0, precio };
      const FocusProductoEncontrado = productsToOrder[actualCustumer?.codigoCliente]?.find(
        (productoPedido) => productoPedido.codigoProducto === codigoProducto
      );
      if (FocusProductoEncontrado) nuevoFocusProducto = { ...FocusProductoEncontrado, precio };
      setFocusProduct(nuevoFocusProducto);
    },
    [productsToOrder, actualCustumer],
  )

  const handleIncrementValue = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoFocusProducto: TProductoPedido = { ...focusProduct, unidades: nuevasUnidades }
      setFocusProduct(nuevoFocusProducto);
    },
    [focusProduct],
  )

  const handleAddToPedido = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (focusProduct.unidades > 0) {
        dispatch(addProductToOrder({
          productToOrder: {
            codigoProducto: focusProduct.codigoProducto,
            unidades: focusProduct.unidades,
            precio: focusProduct.precio * focusProduct.unidades
          },
          codigoCliente: actualCustumer?.codigoCliente
        }));
      } else {
        dispatch(deleteProductToOrder({
          codigoProducto: focusProduct.codigoProducto,
          codigoCliente: actualCustumer?.codigoCliente
        }))
      }
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [focusProduct, dispatch, actualCustumer],
  )

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
                value={actualCustumer?.codigoCliente}
              />
            </Grid>
          </Grid>
        </form>
      </div>
      {!existeCliente && actualCustumer?.codigoCliente !== "" && (
        <div className={classes.sectionAlert}>
          <Alert variant="filled" severity="warning">
            {t('advertencias.clienteNoPortafolio')}
          </Alert>
        </div>
      )}
      {existeCliente && (
        <div>
          <div className={classes.paper}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <InputField
                  label={t('general.buscar')}
                  onChange={handleFindOneProduct}
                  autoFocus={precios && !focusProduct.codigoProducto}
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

          {productsToOrder[actualCustumer?.codigoCliente]?.length > 0 && (
            <CardPedido pedido={productsToOrder[actualCustumer?.codigoCliente]} />
          )}
        </div>
      )}
    </Container>
  );
}
