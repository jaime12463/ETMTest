# language: es

@Pedido @Agregar_producto @Sprint8 @Sprint10 @Sprint11


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
    Cuando ingresa un producto habilitado
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad '<mostarPrecioUnidad>' se mostrará
    Y el precio subunidad '<mostarPrecioSubunidad>' se mostrará
    Y habilitará el ingreso de unidades inicializadas en cero
    Y '<habilitaIngresoSubunidades>' habilita el ingreso de subunidades es inicializadas en cero
    Y '<habilitaIngresoMotivo>' habilita el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.

Ejemplos:
|permiteBotelleo|_requiereMotivo|mostarPrecioUnidad|mostarPrecioSubunidad|habilitaIngresoSubunidades|habilitaIngresoMotivo|
|no             |false          |si                |no                   |no                        |no                   |
|si             |false          |si                |si                   |si                        |no                   |
|no             |true           |no                |no                   |no                        |si                   |
|si             |true           |no                |no                   |si                        |si                   |


Escenario: N°6  El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = false
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = false
    Y tiene precio informado para la fecha de entrega calculada
    Y el _tipoProducto es un _tipoProductosHabilitado para el _tipoPedido en curso
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permite ingresar producto

Escenario: N°7 El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = true y _tieneProductosHabilitados = false
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada
    Y tiene _tieneProductosHabilitados = false en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _tipoProducto es un _tipoProductosHabilitado para el _tipoPedido en curso
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permite ingresar producto

Escenario: N°8 El prevendedor ingresa un producto que aún no se encuentra en el pedido, con _validaPresupuesto = true y _tieneProductosHabilitados = true
    Dado un producto cuyo tipo de pedido tiene _validaPresupuesto = true
    Y tiene precio informado para la fecha de entrega calculada
    Y tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso
    Y el _codigoProducto está informado en los _productosHabilitados
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Entonces el sistema permite ingresar producto

Escenario: N°9 El prevendedor ingresa un producto que se encuentra ya en el pedido
    Dado un producto
    Cuando ingresa un producto que se encuentra en el pedido
    Entonces el sistema permite ingresar producto
