# language: es

@Pedido @Item_Envases @Paso3 @Sprint12

# sprint 12 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542

# Crear una tarjeta para cada envases generado para retorno, ordenado por código de producto, condición de pago (primero contado, después crédito)
# Mostrar:
# Condición de pago, código y descripción del envase, unidades y subunidades para retorno, 
# Precio de la unidad y subunidad, Totales de unidades/subunidades (Toda información no editable)
# Mostrar una línea por cada TipoPedidoEnvasesHabilitados en el orden informados en la configuración: Descripción del tipo de pedido, caja de unidades y subunidades habilitados según configuración del tipo de pedido.


Característica: Mostrar items en tarjetas de envases
    Como prevendedor
    Quiero ver los items que conforman a la tarjeta de envases para retorno
    Para gestionar la venta y prestamo de los envases al cliente

Escenario: N°1 - Mostrar items de tarjeta de envases con tipo de pedido de envases habilitado valorizado
    Dado que existe un pedido cuyo tipo de pedido tiene _generaEnvases = true 
    Y estamos en el paso 3 del pedido
    Y tiene un _tipoPedidoEnvasesHabilitados que tiene _esValorizada = true 
    Cuando se selecciona la tarjeta de envases
    Entonces el sistema desplegará la tarjeta de envases
    Y mostrará las tarjetas de items ordenadas por codigo de producto y por condicion de pago
    con los datos de condición de pago, codigo y descripcion de envase, unidades y subunidades para retorno resultantes del cálculo de envases,
    precio de la unidad y subunidad y los totales de unidad y subunidad, todos no editables
    Y mostrará por cada _tipoPedidoEnvasesHabilitados, de forma ordenada según la configuración, una línea con los datos de descripcion corta del tipo de pedido,
    unidades y subunidades editables y habilitadas según la configuración del pedido


Escenario: N°2 - Mostrar items de tarjeta de envases de pedido con tipo de pedido de envases habilitado no valorizado
    Dado que existe un pedido cuyo tipo de pedido tiene _generaEnvases = true 
    Y estamos en el paso 3 del pedido
    Y no tiene un _tipoPedidoEnvasesHabilitados que tiene _esValorizada = true 
    Cuando se selecciona la tarjeta de envases
    Entonces el sistema desplegará la tarjeta de envases
    Y mostrará las tarjetas de items ordenadas por codigo de producto
    con los datos codigo y descripcion de envase, unidades y subunidades para retorno resultantes del cálculo de envases,
    y los totales de unidad y subunidad, todos no editables
    Y mostrará por cada _tipoPedidoEnvasesHabilitados, de forma ordenada según la configuración, una línea con los datos de descripcion corta del tipo de pedido,
    unidades y subunidades editables y habilitadas según la configuración del pedido


