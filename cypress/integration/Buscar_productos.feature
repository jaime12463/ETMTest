# language: es

@Pedido @Buscar_productos @Sprint2 @Sprint11 @Srptin19

# Sprint11: se debe considerar si el pedido _validaPresupuesto, la vigencia del presupuesto, si tiene productos habilitados
# para el tipo de pedido y si el presupuesto es mayor a 0.
# En casos contrarios, se maneja por _tipoProducto y _tiposProductosHabilitados
# Comentarios:
# Filtrar productos por atributos: código de producto, descripción del producto.
# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=123%3A1241&scaling=scale-down&page-id=123%3A371

# El teclado, para la solución mobile, en el filtro deberá ser un teclado alfanumérico

Característica: Búsqueda de productos
    Como Prevendedor
    Quiero realizar la búsqueda de un producto del portafolio
    Para agregarlo al pedido

Antecedentes:
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido es un _tipoPedidoHabilitados 

Esquema del escenario: N°1 - Buscar producto en portafolio vigente cuando el tipo de pedido no valida presupuesto
    Dado que el _tipoPedido tiene _validaPresupuesto = false
    Y tiene portafolio asignado con precio y vigencia inicial y final
    Cuando se selecciona el control de búsqueda 
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos dos o más caracteres
    Entonces el sistema muestra solamente los productos cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso 
    Y que no sean productos promo push
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 



Esquema del escenario: N°2 - Buscar producto en portafolio vigente con presupuesto de canje cuando no tiene lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y _tieneProductosHabilitados = false
    Cuando se selecciona el control de búsqueda 
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos dos o más caracteres
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°3 - Buscar producto en portafolio vigente con presupuesto de canje cuando existe lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y _tieneProductosHabilitados = true
    Cuando se selecciona el control de búsqueda
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos dos o más caracteres
    Entonces el sistema mostrará los _productosHabilitados en el presupuesto con _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto
    que estén en el portafolio del cliente cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Escenario: N°4 - Selección de productos para agregar
    Dado que se buscaron productos
    Y se seleccionaron productos del listado
    Cuando selecciono el control agregar
    Entonces el sistema agregará los productos seleccionados del listado al _tipoPedido correspondiente

Escenario: N°5 - Borrar búsqueda
    Dado que se buscaron productos
    Cuando selecciono el control Borrar
    Entonces el sistema borrará lo ingresado en el control de búsqueda
    Y borrará los resultados de la búsqueda
    Y borrará los filtros, si se aplicaron
    Y dejará la pantalla preparada para realizar una nueva búsqueda

Escenario: N°6 - Buscar producto habiendo ingresado un filtro previamente
    Dado que se ingresaron filtros de búsqueda de productos
    Y se mostró un listado con los resultados de la búsqueda
    Cuando se ingresan al menos dos o más caracteres
    Entonces el sistema mostrará aquellos productos del listado de resultados que contengan lo ingresado por el prevendedor en su código o en su descricpción
 