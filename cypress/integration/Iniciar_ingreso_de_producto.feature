# language: es

@Pedido @Agregar_producto @Sprint8 @Sprint10 @Sprint11


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

Escenario: N°2 Producto no habilitado para el tipo de pedido
    Cuando ingresa un producto que  tiene precio vigente para la fecha de entrega calculada en el portafolio del cliente
    Y el _tipoProducto no es un _tipoProductoHabilitado para el _tipoPedido en curso
    Entonces el sistema mostrará mensaje "El producto no está habilitado para " + _descripcion del _tipoPedidos

Escenario: N°3 Producto no habilitado para el tipo de pedido que valida presupuesto
    Cuando ingresa un producto que  tiene precio vigente para la fecha de entrega calculada en el portafolio del cliente 
    Y tiene _validaPresupuesto = true 
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso 
    Y el _codigoProducto no está informado en los _productosHabilitados  
    Entonces el sistema mostrará el mensaje "El producto no está habilitado para "  & _descripción del _tipoPedidos



Escenario: N°4 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y no permite botelleo y no requiere motivo
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

Escenario: N°5 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y permite botelleo y no requiere motivo
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

Escenario: N°6 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y no permite botelleo y requiere motivo
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

Escenario: N°7 El prevendedor ingresa un producto que aún no se encuentra en el pedido cuyo tipo de pedido no valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y  permite botelleo y requiere motivo
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



Escenario: N°8 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido,  y tiene precio vigente para la fecha de entrega y no permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y no habilitará el ingreso del motivo.

Escenario: N°9 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y no habilitará el ingreso del motivo.

Escenario: N°10 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto,  el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y no permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, sin motivo seleccionado.

Escenario: N°11 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido  valida presupuesto, el tipo de producto está habilitado para el tipo de pedido, y tiene precio vigente para la fecha de entrega y  permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductoHabilitado para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.



Escenario: N°12 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, el producto está habilitado para el presupuesto,  y tiene precio vigente para la fecha de entrega y no permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados  
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y no habilitará el ingreso del motivo.

Escenario: N°13 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, el producto está habilitado para el presupuesto, y tiene precio vigente para la fecha de entrega y permite botelleo y no requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados  
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y no habilitará el ingreso del motivo.

Escenario: N°14 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido valida presupuesto, el producto está habilitado para el presupuesto, y tiene precio vigente para la fecha de entrega y no permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados  
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, sin motivo seleccionado.

Escenario: N°15 El prevendedor ingresa un producto que aún no se encuentra en el pedido, cuyo tipo de pedido  valida presupuesto, el producto está habilitado para el presupuesto, y tiene precio vigente para la fecha de entrega y  permite botelleo y requiere motivo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada 
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados  
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y el precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.



Escenario: N°16 El prevendedor ingresa un producto que se encuentra en el pedido y no permite botelleo y no requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades con lo registrado en el pedido 
    Y no habilitará el ingreso de subunidades 
    Y no habilitará el ingreso del motivo.

Escenario: N°17 El prevendedor ingresa un producto que se encuentra en el pedido y permite botelleo y no requiere motivo
    Cuando ingresa un producto que ya se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = false
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido
    Y no habilitará el ingreso del motivo.

Escenario: N°18 El prevendedor ingresa un producto que se encuentra en el pedido y no permite botelleo y  requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = no
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades con lo registrado en el pedido 
    Y no habilitará el ingreso de subunidades 
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.

Escenario: N°19 El prevendedor ingresa un producto que se encuentra en el pedido y  permite botelleo y  requiere motivo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y el _tipoProducto es un _tipoProductosHabilitados para el _tipoPedido en curso
    Y permiteBotelleo = si
    Y _requiereMotivo = true
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido
    Y habilitará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.


