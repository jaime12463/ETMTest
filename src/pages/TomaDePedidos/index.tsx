import React, { Fragment, useCallback, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, InputLabel } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  InputTexto,
  TablaProductos,
  FormularioAgregarProducto,
  TarjetaPedido,
} from "components";
import { useTranslation } from "react-i18next";
import { TCliente, TFecha, TPrecio, TProductoPedido } from "models";
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
import { transformDate, darFormatoFecha } from "utils/methods";
import usarEstilos from "./usarEstilos";

export default function TomaDePedidos() {
  const [fechas, setFechas] = useState<TFecha[]>([]);
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [precios, setPrecios] = useState<TPrecio[]>([]);
  const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
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
  const estilos = usarEstilos();

  useEffect(() => {
    dispatch(obtenerClientesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (precios.length > 0) setExisteCliente(true);
  }, [precios]);

  const handleChangeCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      dispatch(establecerClienteActual({ codigoCliente: currentTarget.value }));
      setPrecios([]);
      setExisteCliente(null);
      setFocusProduct({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    [dispatch]
  );

  const handleSearchProducts = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      let nuevosPrecios: [] | TPrecio[] = [];
      let nuevasFechas: [] | TFecha[] = [];
      const clienteEncontrado: TCliente | undefined = clientes.find(
        (clienteDB) => clienteDB.codigoCliente === codigoCliente
      );
      if (clienteEncontrado) {
        nuevasFechas = clienteEncontrado.fechas;
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            new Date(transformDate(producto.iniVig)) <=
              new Date(nuevasFechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(nuevasFechas[0].fechaDeEntrega)
        );
        setExisteCliente(true);
        setRazonSocial(clienteEncontrado.detalles[0].nombreComercial); //Que index deberia ser?
      } else {
        setExisteCliente(false);
        setRazonSocial("");
      }
      setPrecios(nuevosPrecios);
      setFechas(nuevasFechas);
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
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            new Date(transformDate(producto.iniVig)) <=
              new Date(fechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(fechas[0].fechaDeEntrega)
        );
      if (clienteEncontrado && value !== "") {
        nuevosPrecios = clienteEncontrado.precios.filter(
          (producto) =>
            (producto.codigoproducto.includes(value) ||
              producto.nombre.toLowerCase().includes(value.toLowerCase())) &&
            new Date(transformDate(producto.iniVig)) <=
              new Date(fechas[0].fechaDeEntrega) &&
            new Date(transformDate(producto.finVig)) >=
              new Date(fechas[0].fechaDeEntrega)
        );
      }
      setPrecios(nuevosPrecios);
    },
    [clientes, codigoCliente, fechas]
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
    <Fragment>
      <CssBaseline />
      <div className={estilos.paper}>
        <form
          className={estilos.form}
          noValidate
          onSubmit={handleSearchProducts}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <InputTexto
                label={t("general.cliente")}
                onChange={handleChangeCliente}
                value={codigoCliente}
                inputDataCY="codigo-cliente"
              />
            </Grid>
            {existeCliente && (
              <Grid item xs={6} sm={6} className={estilos.sectionRazonSocial}>
                <InputLabel className={estilos.colorTextLabel}>
                  {razonSocial}
                </InputLabel>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
      {!existeCliente && existeCliente !== null && (
        <div className={estilos.sectionAlert}>
          <Alert variant="filled" severity="warning">
            {t("advertencias.clienteNoPortafolio")}
          </Alert>
        </div>
      )}
      {existeCliente && (
        <div>
          <div className={estilos.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputLabel className={estilos.colorTextLabel}>
                  Fecha de entrega:{" "}
                  {darFormatoFecha(
                    new Date(fechas[0].fechaDeEntrega)
                      .toISOString()
                      .split("T")[0]
                  )}
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputTexto
                  label={t("general.buscar")}
                  onChange={handleFindOneProduct}
                  autoFocus={precios && !focusProduct.codigoProducto}
                  inputDataCY="codigo-producto"
                />
              </Grid>
            </Grid>
          </div>

          <FormularioAgregarProducto
            agregarProductoAlPedidoCliente={handleAddToPedido}
            productoActual={focusProduct}
            aumentarUnidadesAlProductoActual={handleIncrementValue}
          />

          <TablaProductos
            titulos={[t("general.producto"), t("general.precio")]}
            productos={precios}
            onClick={handleFocusProduct}
          />

          {productosPedido[codigoCliente]?.length > 0 && (
            <TarjetaPedido pedido={productosPedido[codigoCliente]} />
          )}
        </div>
      )}
    </Fragment>
  );
}
