import React, {
  Fragment,
  useCallback,
  useEffect,
  useState
} from "react";
import {
  InputTexto,
  TablaProductos,
  FormularioAgregarProducto,
  TarjetaPedido,
} from "components";
import {
  cambiarClienteActual,
  agregarProductoAlPedidoDelCliente,
  borrarProductoDelPedidoDelCliente,
  selectPedidoActual,
} from "redux/features/pedidoActual/pedidoActualSlice";
import {
  obtenerDatosClientesProductosAsync,
  selectDatos,
} from "redux/features/datos/datosSlice";
import {
  TCliente,
  TPreciosProductos,
  TProductoPedido,
  TProductoPedidoConPrecios
} from "models";
import {
  useAppSelector,
  useAppDispatch
} from "redux/hooks";
import {
  Button,
  Grid,
  InputLabel
} from "@material-ui/core";
import {
  agregarPedidoCliente
} from "redux/features/pedidosClientes/pedidosClientesSlice";
import {
  obtenerDatosConfiguracionAsync,
} from "redux/features/configuracion/configuracionSlice";
import {
  useTranslation
} from "react-i18next";
import {
  Alert
} from "@material-ui/lab";
import usarEstilos from "./usarEstilos";
import CssBaseline from "@material-ui/core/CssBaseline";
import { transformDate, darFormatoFecha } from "utils/methods";

export default function TomaDePedidos() {
  const [preciosProductos, setPreciosProductos] = useState<TPreciosProductos>([]);
  const [existeCliente, setExisteCliente] = useState<boolean | null>(null);
  const [codigoCliente, setcodigoCliente] = useState<string>("")
  const [razonSocial, setRazonSocial] = useState<string>("");
  const [productoActual, setProductoActual] = useState<TProductoPedidoConPrecios>({
    codigoProducto: "",
    unidades: 0,
    subUnidades: 0,
    precioConImpuestoUnidad: 0,
    precioConImpuestoSubunidad: 0,
  });
  const dispatch = useAppDispatch();
  const pedidoActual = useAppSelector(selectPedidoActual);
  const { datos } = useAppSelector(selectDatos);
  const { t } = useTranslation();
  const estilos = usarEstilos();

  useEffect(() => {
    dispatch(obtenerDatosClientesProductosAsync());
    dispatch(obtenerDatosConfiguracionAsync());
  }, [dispatch]);

  const cambiarCodigoCliente = useCallback(
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      setcodigoCliente(currentTarget.value);
    }, []
  );

  const buscarClienteEnDatos = useCallback(
    (codigoCliente: string): TCliente | undefined =>  datos.clientes[codigoCliente]
    , [datos]
  );

  const obtenerPreciosProductosDelCliente = useCallback(
    (clienteEncontrado: TCliente): TPreciosProductos => {
      const preciosProductosDelCliente: TPreciosProductos = [];
      clienteEncontrado.portafolio.forEach((productoPortafolio) => {
        const productoEncontrado = datos.productos[productoPortafolio.codigoProducto];
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
    }, [datos]
  );

  const asignarPedidoActual = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const clienteEncontrado: TCliente | undefined = buscarClienteEnDatos(codigoCliente);
      if (clienteEncontrado) {
        setExisteCliente(true);
        dispatch(cambiarClienteActual({ codigoCliente: codigoCliente }));
        const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(clienteEncontrado);
        setRazonSocial("Prueba");
        setPreciosProductos(preciosProductosDelCliente);
      } else {
        setExisteCliente(false);
        dispatch(cambiarClienteActual({ codigoCliente: "" }));
        setRazonSocial("");
        setPreciosProductos([]);
      }
    }, [datos, codigoCliente]
  );

  const buscarPreciosProductos = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const preciosProductosFiltrados = preciosProductos.filter((precioProducto) =>
      (precioProducto.codigoProducto.includes(value) ||
        precioProducto.nombre.toLowerCase().includes(value.toLowerCase()))
      );
      if (value === "") {
        const clienteEncontrado: TCliente | undefined = buscarClienteEnDatos(codigoCliente);
        if (clienteEncontrado) {
          const preciosProductosDelCliente: TPreciosProductos = obtenerPreciosProductosDelCliente(clienteEncontrado);
          setPreciosProductos(preciosProductosDelCliente)
        }
      } else setPreciosProductos(preciosProductosFiltrados);
    }, [preciosProductos]
  );

  const asignarProductoActual = useCallback(
    ({ codigoProducto, unidades, precioConImpuestoUnidad, precioConImpuestoSubunidad }: TProductoPedidoConPrecios) => {
      let nuevoProductoActual: TProductoPedidoConPrecios = {
        codigoProducto,
        unidades: 0,
        subUnidades: 0,
        precioConImpuestoUnidad: precioConImpuestoUnidad,
        precioConImpuestoSubunidad: precioConImpuestoSubunidad,
      };
      const productoActualEncontrado: TProductoPedido | undefined = pedidoActual.productosPedido.find(
        (productoPedido) => productoPedido.codigoProducto === codigoProducto
      );
      if (productoActualEncontrado)
        nuevoProductoActual = { ...productoActualEncontrado, precioConImpuestoUnidad, precioConImpuestoSubunidad };
      setProductoActual(nuevoProductoActual);
    }, [pedidoActual]
  );

  const aumentarUnidadesAlProductoActual = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoProductoActual: TProductoPedidoConPrecios = {
        ...productoActual,
        unidades: nuevasUnidades,
      };
      setProductoActual(nuevoProductoActual);
    }, [productoActual]
  );

  const aumentarSubUnidadesAlProductoActual = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
      const nuevasSubUnidades: number = value === "" ? 0 : parseInt(value, 10);
      let nuevoProductoActual: TProductoPedidoConPrecios = {
        ...productoActual,
        subUnidades: nuevasSubUnidades,
      };
      setProductoActual(nuevoProductoActual);
    }, [productoActual]
  );

  const agregarProductoAlPedidoCliente = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (productoActual.unidades > 0) {
        dispatch(
          agregarProductoAlPedidoDelCliente({
            productoPedido: {
              codigoProducto: productoActual.codigoProducto.split(' ')[0],
              unidades: productoActual.unidades,
              subUnidades: productoActual.subUnidades,
              total: (productoActual.precioConImpuestoUnidad * productoActual.unidades) +
                (productoActual.precioConImpuestoSubunidad * productoActual.subUnidades),
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
      setProductoActual({
        codigoProducto: "",
        unidades: 0,
        subUnidades: 0,
        precioConImpuestoUnidad: 0,
        precioConImpuestoSubunidad: 0,
      });
    }, [productoActual, dispatch, codigoCliente]
  );

  const agregarPedidoAlListado = useCallback(
    () => {
      dispatch(agregarPedidoCliente({
        codigoCliente: pedidoActual.codigoCliente,
        productoPedido: pedidoActual.productosPedido,
      }));
    }, [pedidoActual],
  )

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
            aumentarUnidadesAlProductoActual={aumentarUnidadesAlProductoActual}
            aumentarSubUnidadesAlProductoActual={aumentarSubUnidadesAlProductoActual}
            productoActual={productoActual}
          />

          <TablaProductos
            titulos={[t("general.producto"), t("general.precio")]}
            preciosProductos={preciosProductos}
            asignarProductoActual={asignarProductoActual}
          />

          {pedidoActual.productosPedido.length > 0 && (
            <TarjetaPedido pedido={pedidoActual.productosPedido} />
          )}

          <Button variant="contained" color="secondary" onClick={agregarPedidoAlListado}>
            {t("general.comfirmarPedido").toUpperCase()}
          </Button>

        </div>
      )}
    </Fragment>
  );
}
