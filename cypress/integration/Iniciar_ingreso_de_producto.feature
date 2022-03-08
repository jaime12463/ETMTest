# language: es

@Pedido @Agregar_producto @Sprint8 @Sprint10 @Sprint11 @Sprint14 @Sprint24


# Sprint10: Se elimina parámetro esVentaSubunidadesRuta y se deja por producto el botelleo
# Habilita el ingreso del motivo del producto para el tipo de pedido que tenga configurado requiereMotivo
# Se valida el ingreso de producto por tipo de pedido

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ingreso de producto al pedido
    Como prevendedor 
    Quiero ingresar un producto al pedido 
    Para realizar la venta


Escenario: N°1 Producto inexistente
    Dado que el prevendedor se encuentra en el ingreso de un _tipoPedido
    Y el ingreso de productos se encuentra habilitado
    Cuando ingresa un producto que no tiene precio vigente
    Entonces el sistema mostrará mensaje “El código no corresponde a un producto del portafolio del cliente”

Escenario: N°2 Producto no habilitado para el tipo de pedido
    Dado que el prevendedor se encuentra en el ingreso de un _tipoPedido
    Y el ingreso de productos se encuentra habilitado
    Cuando ingresa un producto que tiene precio vigente
    Y el _tipoProducto no es un _tipoProductosHabilitado para el _tipoPedido en curso
    Entonces el sistema mostrará el mensaje "El producto no está habilitado para " + _descripcion del _tipoPedidos

Escenario: N°3 Producto no habilitado para el tipo de pedido que valida presupuesto
    Dado que el prevendedor se encuentra en el ingreso de un _tipoPedido con _validaPresupuesto = true
    Y el ingreso de productos se encuentra habilitado
    Cuando ingresa un producto que tiene precio vigente
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso 
    Y el _codigoProducto no está informado en los _productosHabilitados  
    Entonces el sistema mostrará el mensaje "El producto no está habilitado para " + _descripcion del _tipoPedidos

Esquema del escenario: N°4 Producto permite botelleo
    Dado un producto del portafolio con es _esVentaSubunidades = '<_esVentaSubunidades>' y el tipo de pedido con _habilitaSubunidades = '<_habilitaSubunidades>'
    Cuando ingreso el producto
    Entonces el sistema mostrara '<mostrarHabilitadasSubunidades>' las subunidades en el ingreso del pedido
    
Ejemplos:
|_esVentaSubunidades| _habilitaSubunidades |mostrarHabilitadasSubunidades|
|   true		     |     condicional     |   HABILITA                  |
|	false			 | 	   condicional	   |   DESHABILITA               |
|   true             |     siempre         |   HABILITA                  |
|   false            |     siempre         |   HABILITA                  |
|	true             | 	   nunca	       |   DESHABILITA               |
|   false            | 	   nunca	       |   DESHABILITA               |


# permiteBotelleo = mostrarHabilitadasSubunidades = esVentaSubunidades & habilitaSubunidades

Esquema del escenario: N°5 El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = true y _tieneProductosHabilitados = false
    Dado '<permiteBotelleo>' permite botelleo, y requiere motivo = '<_requiereMotivo>'
    Y el tipo de pedido es valorizado = '<_esValorizado>'
    Cuando ingresa un producto habilitado
    Entonces el sistema creará una nueva tarjeta 
    Y mostrará el _codigoProducto 
    Y el _nombre
    Y el _precioConImpuestoUnidad '<mostarPrecioUnidad>' se mostrará
    Y el _precioConImpuestoSubunidad '<mostarPrecioSubunidad>' se mostrará
    Y habilitará el ingreso de unidades inicializadas en cero
    Y '<habilitaIngresoSubunidades>' se mostrará el ingreso de subunidades es inicializadas en cero
    Y '<habilitaIngresoMotivo>' se mostrará el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.
    Y hará foco en las unidades
Ejemplos:
|_esValorizado|permiteBotelleo|_requiereMotivo|mostarPrecioUnidad|mostarPrecioSubunidad|habilitaIngresoSubunidades|habilitaIngresoMotivo|
|true         |no             |false          |si                |no                   |no                        |no                   |
|true         |si             |false          |si                |si                   |si                        |no                   |
|false        |no             |true           |no                |no                   |no                        |si                   |
|flase        |si             |true           |no                |no                   |si                        |si                   |


Escenario: N°6  El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = false
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada
    Y el _tipoProducto es un _tipoProductosHabilitado para el _tipoPedido en curso
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permitirá ingresar producto

Escenario: N°7 El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = true y _tieneProductosHabilitados = false
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductosHabilitado para el _tipoPedido en curso
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permitirá ingresar producto

Escenario: N°8 El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = true y _tieneProductosHabilitados = true
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permitirá ingresar producto

Escenario: N°9 El prevendedor ingresa un producto que se encuentra ya en el pedido
    Dado un producto
    Cuando ingresa un producto que se encuentra en el pedido
    Entonces el sistema hará visible la tarjeta del producto con foco en las unidades
    Y permitirá ingresar producto


Escenario: N°10 - El producto tiene descuento escalonado aplicado
    Dado que se ingresó un producto que se encuentra en el pedido
    Y se encuentra informado el _descuentoEscalonado para el _codigoProducto en el _portafolio del cliente
    Y tiene un descuento escalonado aplicado
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará el descuento aplicado según el rango
    Y mostrará los nuevos precios aplicados
    Y mostrará el ahorro para unidades
    Y mostrará el ahorro para subunidades
    Y mostrará el control para quitar el descuento


Escenario: N°11 - El producto tiene descuento polarizado aplicado
    Dado que se ingresó un producto que se encuentra en el pedido
    Y se encuentra informado el _descuentoPolarizado para el _codigoProducto en el _portafolio del cliente
    Y tiene un descuento polarizado aplicado
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará el descuento aplicado según el rango
    Y mostrará el precio ingresado por el prevendedor
    Y mostrará el ahorro para unidades
    Y mostrará el ahorro para subunidades

Escenario: N°12 - El producto tiene descuento automático
    Dado que se ingreso un producto al pedido
    Y se encuentra informado _precioConDescuentoUnidad y _precioConDescuentoSubunidad
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará los precios con impuestos tachados
    Y mostrará el precio con descuento en rojo

# al guardar, se guardan todos los precios para luego calcular el ahorro.

Esquema del escenario: N°13 - El total del producto vendido con descuento se encuentra beneficiado por promocion ongoing
    Dado que se ingreso un producto al pedido
    Y el producto tenía aplicado un descuento '<descuento>'
    Y se aplicaron promociones ongoing que otorgaron la totalidad del producto como beneficiado
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará los precios con impuestos tachados
    Y mostrará el icono de promociones
    Y mostrará la leyenda '<leyenda>' en rojo

Ejemplos:
|descuento          |leyenda                                                                       |
| escalonado        | El descuento escalonado del X% ha sido sustituido por una promoción ongoing  |
| automático        | El descuento automático ha sido sustituido por una promoción ongoing         |
| polarizado        | El descuento polarizado ha sido sustituido por una promoción ongoing         |


Esquema del escenario: N°14 - No toda la cantidad del producto vendido con descuento se encuentra beneficiado por promocion ongoing
    Dado que se ingreso un producto al pedido
    Y el producto tenía aplicado un '<descuento>'
    Y se aplicaron promociones ongoing que otorgaron como beneficio parte del producto
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará el producto según escenario de '<tipoDescuento>'
    Y mostrará la cantidad otorgada de beneficio
    Y mostrará la unidad de medida del beneficio
    Y mostrará la leyenda "Viene con promoción ongoing"

Ejemplos:
|descuento | tipoDescuento                 |
|escalonado| descuento escalonado aplicado |
|automático| descuento automático aplicado |
|polarizado| descuento polarizado aplicado |

Escenario: N°15 - El producto vendido sin descuentos se encuentra beneficiado por promocion ongoing
    Dado que se ingreso un producto al pedido
    Y el producto no tenía descuento
    Y se aplicaron promociones ongoing que otorgaron como beneficio cantidad igual o menor a la ingresada del producto
    Cuando se muestra la tarjeta del producto
    Entonces el sistema mostrará la tarjeta del producto 
    Y mostrará la cantidad otorgada de beneficio
    Y mostrará la unidad de medida del beneficio
    Y mostrará la leyenda "Viene con promoción ongoing"
