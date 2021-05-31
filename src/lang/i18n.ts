import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            es: {
                translation: {
                    general:{
                        producto: 'Producto',
                        unidades: 'Unidades',
                        totalUnidades: 'Total Unidades',
                        total: 'Total',
                        cliente: 'Cliente',
                        precio: 'Precio',
                        buscar: 'Buscar',
                        verDetalle: 'Ver Detalle',
                        fechaEntrega: 'Fecha de entrega',
                    },
                    titulos: {
                        bienvenido: 'Bienvenido',
                        ingresoPedido: 'Ingreso de Pedido',
                        productosPedido: 'Productos del Pedido'
                    },
                    advertencias: {
                        clienteNoPortafolio: 'El cliente no tiene portafolio informado'
                    },
                    
                }
            },
            en: {
                translation: {
                    general:{
                        producto: 'Product',
                        unidades: 'Units',
                        totalUnidades: 'Total units',
                        total: 'Total',
                        cliente: 'Customer',
                        precio: 'Price',
                        buscar: 'Search',
                        verDetalle: 'View detail',
                        fechaEntrega: 'Delivery date',
                    },
                    titulos: {
                        bienvenido: 'Welcome',
                        ingresoPedido: 'Order Entry',
                        productosPedido: 'Products of the Order'
                    },
                    advertencias: {
                        clienteNoPortafolio: 'The client does not have an informed portfolio'
                    },  
                }
            }
        }
    });

export default i18n;