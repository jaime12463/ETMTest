# language: es

@Pedido @Agregar_producto @Sprint8 @Sprint10 @Sprint11

# Sprint11:
# Validación de presupuesto y productos habilitados para el tipo de pedido
# Cuando se ingresa un producto en canje se tiene que validar la cantidad, unidades + subunidades, contra el presupuesto del producto - los productos que ya se registraron para ese tipo de pedido para cualquier cliente de la ruta.
#
# Calculo del presupuesto disponible del producto
# presupuestoProducto = _presupuesto - (unidades + subunidades) 
#    unidades = sumatoria de las unidades de todos los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, para la fecha misma fecha de entrega de todos los clientes de la ruta 
#    subunidades = (sumatoria de las subunidades de todos los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, para la fecha misma fecha de entrega de todos los clientes de la ruta ) / _presentación )
# 
# Ejemplo:
#    _presupuesto = 2 (unidades) para el _codigoProducto = 350 para el _tipoPedido = 2, cuyo _habilitaPresupuesto = true
#    _presentacion = 12 del producto.
#    Pedido registrado de Canje N1: 
#                unidades = 1, subunidades = 3
#    Pedido registrado de Canje N2: 
#                unidades = 0, subunidades = 6
#
#    presupuestoProducto = _presupuesto - ( unidades + subunidades)
#    subunidades = (3 + 6) / 12 = 0,75
#    presupuestoProducto = 2 - ( 1 + 0,75) = 0,25



#Sprint10: Se elimina parámetro esVentaSubunidadesRuta y se deja por producto el botelleo
# Habilita el ingreso del motivo del producto para el tipo de pedido que tenga configurado requiereMotivo
# Se valida el ingreso de producto por tipo de pedido
# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2


#Cuando el usuario ingresa el código de producto, el sistema mostrará la descripción, precio unidades y precio subunidades.
#Si esventaSubunidades = false, el sistema no habilitará las subunidades

# Cuando para el cliente/producto está configurado el botelleo igual a esVentaSubunidades = true 
# Entonces el sistema habilita las subunidades en el ingreso del pedido
# |_esVentaSubunidades| _habilitaSubunidades |permiteBotelleo
# |   true		     |     Condicional     |   SI
# |	  false			 | 	   Condicial	   |   NO
# |   true           |     Siempre         |   SI
# |   false          |     Siempre         |   SI  
# |	  -              | 	   Nunca	       |   NO  

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ingreso de producto al pedido
    Como prevendedor 
    Quiero ingresar un producto al pedido 
    Para realizar la venta

Antecedentes:
    Dado que el prevendedor se encuentra en el ingreso de un _tipoPedido
    Y el ingreso de productos se encuentra habilitado

Escenario: N°1 Producto inexistente
    Cuando ingresa un producto que no tiene precio vigente para la fecha de entrega calculada en el portafolio del cliente
    Entonces el sistema mostrará mensaje “El código no corresponde a un producto del portafolio del cliente” 

Escenario: N°2 Producto no habilitado
    Cuando ingresa un producto que  tiene precio vigente para la fecha de entrega calculada en el portafolio del cliente
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Entonces el sistema mostrará mensaje “El producto no está habilitado para el" + _tipoProducto.descripcion

Escenario: N°3 Producto no habilitado para el tipo de pedido que valida presupuesto
    Cuando ingresa un producto en un pedido cuyo tipo de pedido tiene _validaPresupuesto = true 
    Y el _codigoProducto no está informado en los _productos de _presupuestoTipoPedido para el tipo de pedido 
    Entonces el sistema mostrará el mensaje "El producto no está habilitado para "  & _descripción del tipo de pedido 

Escenario: N°4 Producto no tiene presupuesto para el tipo de pedido que valida presupuesto 
    Cuando ingresa un producto en el pedido cuyo un tipo de pedido tiene _validaPresupuesto = true
    Y el _codigoProducto está informado en los _productos de _presupuestoTipoPedido para el tipo de pedido
    Y presupuestoProducto = 0 
    Entonces el sistema mostrará el mensaje "El producto no tiene presupuesto disponible"
    Y permanecerá en el ingreso de producto.

Escenario: N°5 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto y tiene precio vigente para la fecha de entrega y no permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y no habilitará el ingreso del motivo.

Escenario: N°6 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto y tiene precio vigente para la fecha de entrega y permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y no habilitará el ingreso del motivo.

Escenario: N°7 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto y tiene precio vigente para la fecha de entrega y no permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, sin motivo seleccionado.

Escenario: N°8 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto y tiene precio vigente para la fecha de entrega y  permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.

Escenario: N°9 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, está habilitado y tiene presupuesto,  y tiene precio vigente para la fecha de entrega y no permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y presupuestoProducto > 0 
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y no habilitará el ingreso del motivo.

Escenario: N°10 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, está habilitado y tiene presupuesto, y tiene precio vigente para la fecha de entrega y permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y presupuestoProducto > 0 
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y no habilitará el ingreso del motivo.

Escenario: N°11 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, y está habilitado y tiene presupuesto, y tiene precio vigente para la fecha de entrega y no permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y presupuestoProducto > 0 
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, sin motivo seleccionado.

Escenario: N°12 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido  valida presupuesto, y está habilitado y tiene presupuesto, y tiene precio vigente para la fecha de entrega y  permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y presupuestoProducto > 0 
    Y tiene precio informado para la fecha de entrega calculada 
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.


Escenario: N°13 El prevendedor ingresa un producto que se encuentra en el pedido y no permite botelleo y no requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades con lo registrado en el pedido 
    Y no habilitará el ingreso de subunidades 
    Y no habilitará el ingreso del motivo.

Escenario: N°14 El prevendedor ingresa un producto que se encuentra en el pedido y permite botelleo y no requiere motivo
    Cuando ingresa un producto que ya se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido
    Y no habilitará el ingreso del motivo.

Escenario: N°15 El prevendedor ingresa un producto que se encuentra en el pedido y no permite botelleo y  requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades con lo registrado en el pedido 
    Y no habilitará el ingreso de subunidades 
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.

Escenario: N°16 El prevendedor ingresa un producto que se encuentra en el pedido y  permite botelleo y  requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.


