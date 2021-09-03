# language: es

@Pedido @Buscar_productos @Buscar_por_atributos @Sprint2 @Sprint11

# Sprint11: se debe considerar si el pedido _validaPresupuesto, la vigencia del presupuesto, si tiene productos habilitados
# para el tipo de pedido y si el presupuesto es mayor a 0.
# En casos contrarios, se maneja por _tipoProducto y _tiposProductosHabilitados
# Comentarios:
# Filtrar productos por atributos: código de producto, descripción del producto.
# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=123%3A1241&scaling=scale-down&page-id=123%3A371


Característica: Búsqueda de productos por atributos
    Como Prevendedor
    Quiero realizar la búsqueda de un producto por atributos
    Para agregarlo al pedido

Esquema del escenario: N°1 Filtrar producto en portafolio vigente cuando el tipo de pedido no valida presupuesto
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = false
    Y tiene portafolio asignado con precio y vigencia inicial y final
    Cuando haya ingresado al menos dos o más caracteres
    Entonces el sistema muestra solamente los productos cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso 
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°2 Filtrar producto en portafolio vigente con presupuesto de canje y el presupuesto no está vigente
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene _vigenciaFinPresupuesto <= fecha de entrega
    Y _tieneProductosHabilitados = false
    Cuando haya ingresado al menos dos o más caracteres
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°3 Filtrar producto en portafolio vigente con presupuesto de canje cuando no tiene lista de productos habilitados
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene _vigenciaInicioPresupuesto <= fecha de entrega <= _vigenciaFinPresupuesto
    Y _tieneProductosHabilitados = false
    Cuando haya ingresado al menos dos o más caracteres
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y tengan _presupuesto, menos los productos que ya se registraron para ese tipo de pedido para cualquier cliente de la ruta, mayor a 0
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°4 Filtrar producto en portafolio vigente con presupuesto de canje cuando existe lista de productos habilitados
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido para el _tipoPedido en curso tiene _vigenciaInicioPresupuesto <= fecha de entrega <= _vigenciaFinPresupuesto
    Y _tieneProductosHabilitados = true
    Cuando haya ingresado al menos dos o más caracteres
    Entonces el sistema mostrará los _productosHabilitados que estén en el portafolio asignado al cliente 
    Y tengan _presupuesto, menos los productos que ya se registraron para ese tipo de pedido para cualquier cliente de la ruta, mayor a 0
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 
