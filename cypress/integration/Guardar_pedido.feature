# language: es

@Pedido @Guardar_pedido @Sprint7 @Sprint8 @Sprint9 @Sprint10

# Cuando el tipo de pedido es Canje registrar lo sigguiente:
#            Tipo de Operación: "Canje"
#            Registrar detalle del producto: código de motivo  

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Guardar actividad realizada
    Como prevendedor
    Quiero guardar el pedido y compromiso de cobro realizados
    Para luego informar a central la actividad realizada

Comentario:
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
# tipo de operación: “Venta”
# Cuando se guarda el compromiso de cobro se debe registrar:
# ID, Código de cliente, Fecha y hora, fecha de entrega, monto, tipo de documento (material=” Efectivo”)
# sprint 8 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Antecedentes:
    Dado un pedido ingresado y/o un compromiso de cobro registrado
Y montoVentaMaximo = montoVentaContadoMaxima - consumido para la fecha de entrega - pedidos de contado registrados para la misma fecha de entrega - compromisos de cobro para la misma fecha de entrega
Y creditoDisponible = informacionCrediticia.disponible – pedidos a crédito ya registrados – productos a crédito del pedido actual

Escenario: N°1 – El cliente de contado o crédito formal no tiene pedidos activos para la fecha de entrega y el pedido cumple el mínimo y no excede el máximo. No se valida crédito disponible.
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es mayor o igual a _montoVentaMinimo del cliente 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo
    Y la _condición de crédito del cliente es distinta de crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente
    

Escenario: N°2 – El cliente de crédito informal no tiene pedidos activos para la fecha de entrega y no excede el límite de crédito y el pedido cumple el mínimo y no excede el máximo
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
    Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es mayor o igual _montoVentaMinimo del cliente 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo
    Y la _condición de crédito del cliente es igual crédito informal 
    Y el creditoDisponible es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y lo mostrará en la lista de pedidos del cliente


Escenario: N°3 – El total del pedido no cumple con el pedido mínimo 
    Dado que el cliente no tiene pedidos en estado Activo para la misma fecha de entrega del pedido a guardar
     Y la suma del monto del pedido a guardar, cuyo tipo de pedido _contribuyeAMinimo = true, es menor al _montoVentaMinimo del cliente 
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido no alcanza el monto de venta mínima montoVentaMinimo” y permanecerá en la pantalla  
    

Escenario: N°4 – El pedido de contado excede con el pedido máximo 
    Dado que la suma del monto de los productos de contado, cuyo tipo de pedido es _valorizado = true,  + compromiso de cobro es mayor a montoVentaMaximo
    Y la _condición de crédito del cliente es igual crédito informal 
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido excede el monto de venta máxima montoVentaMaximo” y permanecerá en la pantalla  
    
Escenario: N°5 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos para la fecha entrega, los productos de contado no superan el monto máximo y el cliente no es de crédito informal, por lo que no valida el crédito
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo 
    Y el cliente no tiene _condición de pago igual a crédito informal
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

Escenario: N°6 – El pedido a guardar no necesita cumplir el pedido mínimo ya que hay otros pedidos activos, los productos de contado no superan el monto máximo y el cliente de crédito informal no supero el crédito disponible
    Dado que el cliente tiene otros pedidos activos para la fecha de entrega 
    Y la suma del monto de los productos de contado, cuyo tipo de pedido _esValorizado = true,  + compromiso de cobro es menor o igual a montoVentaMaximo  
    Y el cliente tiene _condición de pago crédito informal  
    Y el creditoDisponible es mayor o igual a cero
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido y volverá a la pantalla de cliente

Escenario: N°7 – El cliente es de crédito informal y el pedido a guardar a crédito excede el crédito disponible
    Dado que el cliente tiene _condición de pago crédito informal 
    Y se ingresaron productos con _condición de pago crédito
    Y el créditoDisponible es menor a cero
    Cuando guardo el pedido
    Entonces el sistema Mostrará mensaje “El pedido excede el crédito disponible” y permanecerá en la pantalla  
