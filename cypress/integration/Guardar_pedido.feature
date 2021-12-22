# language: es

@Pedido @Guardar_pedido @Iniciativas @Bonificaciones @Sprint7 @Sprint8 @Sprint9 @Sprint10 @Sprint11 @Sprint13 @Sprint15 @Sprint17 
@Sprint19

# Sprint18: Al guardar el pedido, si existen productos que también se informan en algún grupo de coberturas
# se debe guardar la información de cobertura para luego no mostrar ese grupo en planeación

# Sprint17: 
# Cabecera: idPedido, codigo cliente, idBonificación, fecha y hora, usuario, ruta
# Detalle: idPedido, codigo producto, cantidad, unidad de medida.

# Guardar el precioConImpuestoUnidad, precioConImpuestoSubunidad y los precios con descuento
# para luego calcular el ahorro (precio - precio_con_descuento) 


# Sprint13: 
# Registrar detalle: se deben registrar los subtotales de monto de unidades y subunidades por separado, los cuales serán necesarios para el comprobante del resumen del pedido 
#            subtotal_unidades: cantidad de unidades por precio unitario unidad
#            subtotal_subunidades: cantidad de subunidades por precio unitario subunidad

# Cuando el tipo de pedido es envases registrar lo siguiente:
#            Tipo de Operación: Venta/Préstamo Envase, se guarda el código del tipo de operación
#            Si el tipo de pedido de envase es de venta, se debe guardar la condición de pago = Crédito/Contado


# Sprint11: Si el pedido a cerrar es válido, y para la ruta _habilitaOrdenDeCompra=true 
# y se registro algún pedido valorizado, se muestra un dialogo para el ingreso de la orden de compra. 
# Habilitar el boton Si del diálogo si se ingresó la orden de compra.
# Si el usuario responde Si, la orden de compra se debe registrar en la cabecera de todos los pedido cuyo _tipoPedido tiene _esValorizado=true.
# Si el usuario responde No, el sistema continúa con el cierre normal del pedido

# Sprint11 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=1256%3A2&scaling=min-zoom&page-id=1075%3A2&starting-point-node-id=1256%3A2

# Cuando el tipo de pedido es Canje registrar lo siguiente:
#            Tipo de Operación: "Canje", se guarda el código del tipo de operación
#            Registrar detalle del producto: código de motivo  

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Guardar actividad realizada
    Como prevendedor
    Quiero guardar el pedido y compromiso de cobro realizados y registar las iniciativas cumplidas
    Para luego informar a central la actividad realizada

# Comentario:
# el pedido máximo se evalúa sobre los pedidos de contado y compromiso de coro. 
# Cuando guarda el pedido tiene que generar una o dos cabeceras según la condición de pago de los productos ingresados

# Agregar botón para guardar el pedido y/o Compromiso de cobro. 
# Los pedidos deben registrarse con un id.
# Registrar en cabecera por cada condición de pago que tenga productos registrados: número de pedido, código de cliente, fecha de entrega, fecha y hora de registro, tipo de operación, condición de pago, total unidades, total subunidades, 
# monto total del pedido, código de usuario, estado
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto, condición de pago
# codigo de usuario: “SFA01”
# estado: Activo (Default), Cancelado
# condición de pago: Crédito, Contado
# tipo de operación: guardar el código del tipo de operación
# Cuando se guarda el compromiso de cobro se debe registrar:
# ID, Código de cliente, Fecha y hora, fecha de entrega, monto, tipo de documento (material=” Efectivo”)
# sprint 8 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Antecedentes:
    Dado un pedido ingresado y/o un compromiso de cobro registrado
    Y montoVentaMaximo = montoVentaContadoMaxima - consumido para la fecha de entrega - pedidos de contado registrados para la misma fecha de entrega - compromisos de cobro para la misma fecha de entrega
    Y creditoDisponible = informacionCrediticia.disponible - pedidos a crédito ya registrados – productos a crédito del pedido actual

Escenario: N°1 - El cliente de contado o crédito formal no tiene pedidos activos para la fecha de entrega y el pedido cumple el mínimo y no excede el máximo. No se valida crédito disponible.
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es mayor o igual a _montoVentaMinimo del cliente 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo
    Y la _condición de crédito del cliente es distinta de crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido 
    Y registrará la orden de compra en la cabecera de todos los pedidos cuyos tipos de pedido son _esValorizado = true
    Y volverá a la pantalla de cliente

Escenario: N°2 - El cliente de crédito informal no tiene pedidos activos para la fecha de entrega y no excede el límite de crédito y el pedido cumple el mínimo y no excede el máximo
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es mayor o igual _montoVentaMinimo del cliente 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo
    Y la _condición de crédito del cliente es igual crédito informal 
    Y el creditoDisponible es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido 
    Y registrará la orden de compra en la cabecera de todos los pedidos cuyos tipos de pedido son _esValorizado = true


Escenario: N°3 - El total del pedido no cumple con el pedido mínimo 
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
     Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es menor al _montoVentaMinimo del cliente 
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje "El pedido no alcanza el monto de venta mínima montoVentaMinimo" y permanecerá en la pantalla  
    

Escenario: N°4 - El pedido de contado excede con el pedido máximo 
    Dado que la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es mayor a montoVentaMaximo
    Y la _condición de crédito del cliente es igual crédito informal 
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje "El pedido excede el monto de venta máxima montoVentaMaximo" y permanecerá en la pantalla  
    
Escenario: N°5 - El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos para la fecha entrega, los productos de contado no superan el monto máximo y el cliente no es de crédito informal, por lo que no valida el crédito
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo 
    Y el cliente no tiene _condición de pago igual a crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido 
    Y registrará la orden de compra en la cabecera de todos los pedidos cuyos tipos de pedido son _esValorizado = true
    Y volverá a la pantalla de cliente

Escenario: N°6 - El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos activos, los productos de contado no superan el monto máximo y el cliente de crédito informal no supero el crédito disponible
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo  
    Y el cliente tiene _condición de pago crédito informal  
    Y el creditoDisponible es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido 
    Y registrará la orden de compra en la cabecera de todos los pedidos cuyos tipos de pedido son _esValorizado = true
    Y volverá a la pantalla de cliente

Escenario: N°7 - El cliente es de crédito informal y el pedido a guardar a crédito excede el crédito disponible
    Dado que el cliente tiene _condición de pago crédito informal 
    Y se ingresaron productos con _condición de pago crédito
    Y el créditoDisponible es menor a cero
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje "El pedido excede el crédito disponible" y permanecerá en la pantalla  

Escenario: N°8 - Iniciativas cumplidas
    Dado que el cliente tiene iniciativas habilitadas para el pedido actual
    Y al menos un producto de las iniciativas se encuentran en el pedido 
    #Y la suma de las cantidades de dichos productos es mayor o igual a la indicada en la iniciativa
    Y la suma de las cantidades de dichos productos, sean unidades o subunidades según la unidad de medida de la iniciativa, es mayor o igual al disponible indicado en la iniciativa
    Cuando guardo el pedido
    Entonces el sistema registrara la iniciativa con status = "Ejecutada" indicando usuario, fecha y hora, código de iniciativa, código de cliente, status, producto, unidades y subunidades.

Escenario: N°9 - Iniciativas no cumplidas
    Dado que el cliente tiene iniciativas con status = "Ejecutada" para el pedido actual
    Y al menos un producto de la iniciativa se encuentra en el pedido 
    #Y la suma de las cantidades de dichos productos es menor a la indicada en la iniciativa
    Y la suma de las cantidades de dichos productos, sean unidades o subunidades según la unidad de medida de la iniciativa, es menor al disponible indicado en la iniciativa
    Cuando guardo el pedido
    Entonces el sistema elimina la iniciativa registrada

# La conversión según la unidad de medida se debe realizar con la presentación. Ej, si la unidad de medida es subunidades
# y se vende 1 unidad de un producto que tiene presentación 12, se convierten en 12 subunidades para el cálculo.

Escenario: N°10 - Bonificaciones ingresadas
    Dado que se ingresaron bonificaciones para el pedido actual
    Cuando guardo el pedido
    Entonces el sistema registrara las bonificaciones, en la cabecera el número de pedido, codigo cliente, _idBonificación, fecha y hora, código de usuario, ruta
    Y en el detalle el número de pedido, codigo producto, cantidad, _unidadMedida
    Y actualizará las _bonificacionesDisponibles

 # Queda pendiente si se debe guardar la clase de condición de la bonificacion

Escenario: N°11 - Coberturas ingresadas
    Dado que se ingresaron productos en el _tipoPedido = "Venta"
    Y existen grupos de coberturas con los mismos productos
    Cuando guardo el pedido
    Entonces el sistema registrará el cliente, _grupoCobertura, el _codigo producto y las cantidades ingresadas de los productos
	