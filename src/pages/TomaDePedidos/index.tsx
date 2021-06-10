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
import { TCliente, TPreciosProductos, TProductoPedido } from "models";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  cambiarClienteActual,
  agregarProductoAlPedidoDelCliente,
  borrarProductoDelPedidoDelCliente,
  selectPedidoActual,
} from "redux/features/pedidoActual/pedidoActualSlice";
import {
  obtenerDatosAsync,
  selectDatos,
} from "redux/features/datos/datosSlice";
// import { transformDate, darFormatoFecha } from "utils/methods";
import usarEstilos from "./usarEstilos";

export default function TomaDePedidos() {
  const [preciosProductos, setPreciosProductos] = useState<TPreciosProductos>([]);
  const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
  const [codigoCliente, setcodigoCliente] = useState<string>("")

  // const [fechas, setFechas] = useState<TFecha[]>([]);
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [productoActual, setProductoActual] = useState<TProductoPedido>({
    codigoProducto: "",
    unidades: 0,
    subUnidades: 0,
    precio: 0,
  });
  const dispatch = useAppDispatch();
  // const productosPedido = useAppSelector(selectPedidosClientes);
  const pedidoActual = useAppSelector(selectPedidoActual);
  const { t } = useTranslation();
  const estilos = usarEstilos();
  const { datos } = useAppSelector(selectDatos);

  useEffect(() => {
    dispatch(obtenerDatosAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   if (precios.length > 0) setExisteCliente(true);
  // }, [precios]);

  const cambiarCodigoCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      setcodigoCliente(currentTarget.value);
      // dispatch(establecerClienteActual({ codigoCliente: currentTarget.value }));
      // setPrecios([]);
      // setExisteCliente(null);
      // setproductoActual({ codigoProducto: "", unidades: 0, precio: 0 });
    },
    []
  );

  const buscarClienteEnDatos = useCallback(
    (codigoCliente: string): TCliente | undefined => datos.clientes.find(
      (clienteDatos) => clienteDatos.codigoCliente === codigoCliente
    ),
    [datos]
  );

  const obtenerPreciosProductosDelCliente = useCallback(
    (clienteEncontrado: TCliente): TPreciosProductos => {
      const preciosProductosDelCliente: TPreciosProductos = [];
      clienteEncontrado.portafolio.forEach((productoPortafolio) => {
        const productoEncontrado = datos.productos.find(
          (producto) => producto.codigoProducto === productoPortafolio.codigoProducto
        );
        if (productoEncontrado) {
          preciosProductosDelCliente.push(
            {
              ...productoPortafolio,
              nombre: productoEncontrado.nombre,
              presentacion: productoEncontrado.presentacion
            }
          );
        }
      });
      return preciosProductosDelCliente;
    },
    [datos]
  );

  const asignarPedidoActual = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const clienteEncontrado: TCliente | undefined = buscarClienteEnDatos(codigoCliente);
      console.log(clienteEncontrado, "Cliente Encontrado")
      if (clienteEncontrado) {
        setExisteCliente(true);
        console.log(codigoCliente, "Codigo Cliente")
        dispatch(cambiarClienteActual({ codigoCliente: codigoCliente }));
        const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(clienteEncontrado);
        console.log(preciosProductosDelCliente, "Precios Productos")
        setRazonSocial("Prueba");
        setPreciosProductos(preciosProductosDelCliente);
      } else {
        setExisteCliente(false);
        dispatch(cambiarClienteActual({ codigoCliente: "" }));
        setRazonSocial("");
        setPreciosProductos([]);
      }
      // let nuevosPrecios: [] | TPrecio[] = [];
      // let nuevasFechas: [] | TFecha[] = [];

      // if (clienteEncontrado) {
      //   nuevasFechas = clienteEncontrado.fechas;
      //   nuevosPrecios = clienteEncontrado.precios.filter(
      //     (producto) =>
      //       new Date(transformDate(producto.iniVig)) <=
      //         new Date(nuevasFechas[0].fechaDeEntrega) &&
      //       new Date(transformDate(producto.finVig)) >=
      //         new Date(nuevasFechas[0].fechaDeEntrega)
      //   );
      //   setExisteCliente(true);
      //   setRazonSocial(clienteEncontrado.detalles[0].nombreComercial); //Que index deberia ser?
      // } else {
      //   setExisteCliente(false);
      //   setRazonSocial("");
      // }
      // setPrecios(nuevosPrecios);
      // setFechas(nuevasFechas);
    },
    [datos, codigoCliente]
  );

  const buscarPreciosProductos = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {

      console.log(preciosProductos)

      const preciosProductosFiltrados = preciosProductos.filter((precioProducto) =>
      (precioProducto.codigoProducto.includes(value) ||
        precioProducto.nombre.toLowerCase().includes(value.toLowerCase()))
      );

      console.log(preciosProductosFiltrados)

      if (value === "") {
        const clienteEncontrado: TCliente | undefined = buscarClienteEnDatos(codigoCliente);
        if (clienteEncontrado) {
          const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(clienteEncontrado);
          setPreciosProductos(preciosProductosDelCliente)
        }
      } else setPreciosProductos(preciosProductosFiltrados);

      // let nuevosPrecios: [] | TPrecio[] = [];
      // const clienteEncontrado: TCliente | undefined = clientes.find(
      //   (clienteDB) => clienteDB.codigoCliente === codigoCliente
      // );
      // if (clienteEncontrado && value === "")
      //   nuevosPrecios = clienteEncontrado.precios.filter(
      //     (producto) =>
      //       new Date(transformDate(producto.iniVig)) <=
      //         new Date(fechas[0].fechaDeEntrega) &&
      //       new Date(transformDate(producto.finVig)) >=
      //         new Date(fechas[0].fechaDeEntrega)
      //   );
      // if (clienteEncontrado && value !== "") {
      //   nuevosPrecios = clienteEncontrado.precios.filter(
      //     (producto) =>
      //       (producto.codigoproducto.includes(value) ||
      //         producto.nombre.toLowerCase().includes(value.toLowerCase())) &&
      //       new Date(transformDate(producto.iniVig)) <=
      //         new Date(fechas[0].fechaDeEntrega) &&
      //       new Date(transformDate(producto.finVig)) >=
      //         new Date(fechas[0].fechaDeEntrega)
      //   );
      // }
      // setPrecios(nuevosPrecios);
    },
    [preciosProductos]
  );

  const asignarProductoActual = useCallback(
    ({ codigoProducto, unidades, precio }: TProductoPedido) => {
      let nuevoProductoActual: TProductoPedido = {
        codigoProducto,
        unidades: 0,
        subUnidades: 0,
        precio,
      };
      const productoActualoEncontrado = pedidoActual.productosPedido.find(
        (productoPedido) => productoPedido.codigoProducto === codigoProducto
      );
      if (productoActualoEncontrado)
        nuevoProductoActual = { ...productoActualoEncontrado };
      setProductoActual(nuevoProductoActual);
    },
    [pedidoActual]
  );

  const incrementarUnidadesProducto = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoProductoActual: TProductoPedido = {
        ...productoActual,
        unidades: nuevasUnidades,
      };
      setProductoActual(nuevoProductoActual);
    },
    [productoActual]
  );

  const agregarProductoAlPedidoCliente = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (productoActual.unidades > 0) {
        dispatch(
          agregarProductoAlPedidoDelCliente({
            productoPedido: {
              codigoProducto: productoActual.codigoProducto,
              unidades: productoActual.unidades,
              subUnidades: productoActual.subUnidades,
              precio: productoActual.precio * productoActual.unidades,
            },
            codigoCliente: codigoCliente,
          })
        );
      } else {
        dispatch(
          borrarProductoDelPedidoDelCliente({
            codigoProducto: productoActual.codigoProducto,
            codigoCliente: codigoCliente,
          })
        );
      }
      setProductoActual({ codigoProducto: "", unidades: 0, subUnidades: 0, precio: 0 });
    },
    [productoActual, dispatch, codigoCliente]
  );

  console.log( productoActual, "producto actual")

  return (
    <Fragment>
      <CssBaseline />
      <div className={estilos.paper}>
        <form
          className={estilos.form}
          noValidate
          onSubmit={asignarPedidoActual}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <InputTexto
                label={t("general.cliente")}
                onChange={cambiarCodigoCliente}
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
                  {/* {darFormatoFecha(
                    new Date(fechas[0].fechaDeEntrega)
                      .toISOString()
                      .split("T")[0]
                  )} */}
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputTexto
                  label={t("general.buscar")}
                  onChange={buscarPreciosProductos}
                  autoFocus={preciosProductos && !productoActual.codigoProducto}
                  inputDataCY="codigo-producto"
                />
              </Grid>
            </Grid>
          </div>

          <FormularioAgregarProducto
            agregarProductoAlPedidoCliente={agregarProductoAlPedidoCliente}
            productoActual={productoActual}
            aumentarUnidadesAlProductoActual={incrementarUnidadesProducto}
          />

          <TablaProductos
            titulos={[t("general.producto"), t("general.precio")]}
            productos={preciosProductos}
            onClick={asignarProductoActual}
          />

          {pedidoActual.productosPedido.length > 0 && (
            <TarjetaPedido pedido={pedidoActual.productosPedido} />
          )}
        </div>
      )}
    </Fragment>
  );
}
