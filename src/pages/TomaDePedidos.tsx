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
import { TCliente, TClientePedido, TPrecio, TProductoPedido } from "models";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  agregarPedidoCliente,
  borrarPedidoCliente,
  selectPedidosClientes,
} from "redux/features/pedidosClientes/pedidosClientesSlice";
import {
  selectClienteActual,
  establecerClienteActual,
} from "redux/features/clienteActual/clienteActualSlice";
import {
  obtenerClientesAsync,
  selectCliente,
} from "redux/features/clientes/clientesSlice";
import { InputLabel } from "@material-ui/core";

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
  sectionRazonSocial: {
    display: "flex",
    alignItems: "center",
  },
  colorTextLabel: {
    color: "black",
  },
}));

export default function TomaDePedidos() {
  const { setTitle } = useAppContext();
  const [precios, setPrecios] = useState<TPrecio[]>([]);
  const [existeCliente, setExisteCliente] = useState<boolean>(false);
  const [focusProduct, setFocusProduct] = useState<TProductoPedido>({
    codigoProducto: "",
    unidades: 0,
    precio: 0,
  });
  const dispatch = useAppDispatch();
  const productosPedido = useAppSelector(selectPedidosClientes);
  const { codigoCliente } = useAppSelector(selectClienteActual);
  const { clientes } = useAppSelector(selectCliente);

  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTitle(t("titulos.ingresoPedido"));
    dispatch(obtenerClientesAsync());
  }, [setTitle, t]);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      dispatch(establecerClienteActual({ codigoCliente: currentTarget.value }));
      setPrecios([]);
      setExisteCliente(false);
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [dispatch]
  );

  const handleSearchProducts = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      let nuevosPrecios: [] | TPrecio[] = [];
      const clienteEncontrado: TCliente | undefined = clientes.find(
        (clienteDB) => clienteDB.codigoCliente === codigoCliente
      );
      if (clienteEncontrado) nuevosPrecios = clienteEncontrado.precios;
      setPrecios(nuevosPrecios);
    },
    [clientes, codigoCliente]
  );

  const handleFindOneProduct = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      let nuevosPrecios: [] | TPrecio[] = [];
      const clienteEncontrado: TCliente | undefined = clientes.find(
        (clienteDB) => clienteDB.codigoCliente === codigoCliente
      );
      if (clienteEncontrado && value === "")
        nuevosPrecios = clienteEncontrado.precios;
      if (clienteEncontrado && value !== "") {
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            producto.codigoproducto.substr(0, value.length) === value
        );
      }
      setPrecios(nuevosPrecios);
    },
    [clientes, codigoCliente]
  );

  const handleFocusProduct = useCallback(
    ({ codigoProducto, unidades, precio }: TProductoPedido) => {
      let nuevoFocusProducto: TProductoPedido = {
        codigoProducto,
        unidades: 0,
        precio,
      };
      const FocusProductoEncontrado = productosPedido[codigoCliente]?.find(
        (productoPedido) => productoPedido.codigoProducto === codigoProducto
      );
      if (FocusProductoEncontrado)
        nuevoFocusProducto = { ...FocusProductoEncontrado, precio };
      setFocusProduct(nuevoFocusProducto);
    },
    [productosPedido, codigoCliente]
  );

  const handleIncrementValue = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoFocusProducto: TProductoPedido = {
        ...focusProduct,
        unidades: nuevasUnidades,
      };
      setFocusProduct(nuevoFocusProducto);
    },
    [focusProduct]
  );

  const handleAddToPedido = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (focusProduct.unidades > 0) {
        dispatch(
          agregarPedidoCliente({
            productoPedido: {
              codigoProducto: focusProduct.codigoProducto,
              unidades: focusProduct.unidades,
              precio: focusProduct.precio * focusProduct.unidades,
            },
            codigoCliente: codigoCliente,
          })
        );
      } else {
        dispatch(
          borrarPedidoCliente({
            codigoProducto: focusProduct.codigoProducto,
            codigoCliente: codigoCliente,
          })
        );
      }
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [focusProduct, dispatch, codigoCliente]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSearchProducts}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <InputField
                label={t("general.cliente")}
                onChange={handleChangeCliente}
                value={codigoCliente}
              />
            </Grid>
            {existeCliente && (
              <Grid item xs={6} sm={6} className={classes.sectionRazonSocial}>
                <InputLabel className={classes.colorTextLabel}>
                  Raz Soc no disponible.
                </InputLabel>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
      {!existeCliente && codigoCliente !== "" && (
        <div className={classes.sectionAlert}>
          <Alert variant="filled" severity="warning">
            {t("advertencias.clienteNoPortafolio")}
          </Alert>
        </div>
      )}
      {existeCliente && (
        <div>
          <div className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs={6} sm={6}>
                <InputLabel className={classes.colorTextLabel}>
                  Fecha lalala
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  label={t("general.buscar")}
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
            headers={[t("general.producto"), t("general.precio")]}
            precios={precios}
            onClick={handleFocusProduct}
          />

          {productosPedido[codigoCliente]?.length > 0 && (
            <CardPedido pedido={productosPedido[codigoCliente]} />
          )}
        </div>
      )}
    </Container>
  );
}
