import { TomaDePedidos, DetallePedido, Inicio } from "../pages";
const rutas = [
    {
        ruta: '/ingresarpedido',
        titulo: "titulos.ingresoPedido",
        componente: TomaDePedidos,
        esConFechaHaciaAtras: true,
        esConLogoInferior: false,
    },
    {
        ruta: '/detalle',
        titulo: "titulos.productosPedido",
        componente: DetallePedido,
        esConFechaHaciaAtras: true,
        esConLogoInferior: false,
    },
    {
        ruta: '/',
        titulo: "titulos.bienvenido",
        componente: Inicio,
        esConFechaHaciaAtras: false,
        esConLogoInferior: true,
    }
]
export default rutas;
