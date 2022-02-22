# language: es

@Pedido @Buscar_productos @Sprint2 @Sprint11 @Srptin19 @Sprint22

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
    Dado que el prevendedor seleccionó _tipoPedido 
    Y seleccionó el control para buscar buscar productos 

Esquema del escenario: N°1 - Buscar producto en portafolio vigente cuando el tipo de pedido no valida presupuesto
    Dado que el _tipoPedido tiene _validaPresupuesto = false
    Y tiene portafolio asignado con precio y vigencia inicial y vigencia final
    Cuando se selecciona el control de búsqueda 
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos tres o más caracteres
    Entonces el sistema mostrará solamente los productos cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso 
    Y que no sean productos promo push
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y ordenados ascendente por código de producto

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 



Esquema del escenario: N°2 - Buscar producto en portafolio vigente con presupuesto de canje cuando no tiene lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido tiene _tieneProductosHabilitados = false
    Cuando se selecciona el control de búsqueda 
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos tres o más caracteres
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y ordenados ascendente por código de producto

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°3 - Buscar producto en portafolio vigente con presupuesto de canje cuando existe lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido tiene _tieneProductosHabilitados = true
    Cuando se selecciona el control de búsqueda
    Y se muestra el teclado alfanumérico
    Y se ingresan al menos tres o más caracteres
    Entonces el sistema mostrará los _productosHabilitados en el presupuesto con _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto
    Y que estén en el portafolio del cliente cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y ordenados ascendente por código de producto

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
    Y mostrará el panel de ingreso de producto en la tarjeta del _tipoPedido seleccionado

Escenario: N°5 - Borrar búsqueda
    Dado que se buscaron productos
    Cuando selecciono el control Borrar
    Entonces el sistema borrará lo ingresado en el control de búsqueda
    Y borrará los resultados de la búsqueda
    Y borrará los filtros, si se aplicaron
    Y borrará las selección de los productos, si se seleccionaron
    Y dejará la pantalla preparada para realizar una nueva búsqueda

Escenario: N°6 - Buscar producto habiendo ingresado un filtro previamente
    Dado que se ingresaron filtros de búsqueda de productos
    Y se mostró un listado con los resultados de la búsqueda
    Cuando se ingresan al menos tres o más caracteres
    Entonces el sistema mostrará aquellos productos del listado de resultados que contengan lo ingresado por el prevendedor en su código o en su descricpción
    Y ordenados ascendente por código de producto
 
 Escenario: N°7 - Buscar producto teniendo resultados marcados 
    Dado que se buscaron productos
    Y se seleccionaron productos del listado
    Cuando ingreso una nueva búsqueda de producto
    Entonces el sistema desmarcará los productos seleccionados del listado
    Y realizará la búsqueda del nuevo producto

Escenario: N°8 - Busqueda de productos sin resultados
    Dado que se ingresaron al menos dos o más caracteres
    Y no hay resultados para la búsqueda ingresada
    Cuando se muestran los resultados de la búsqueda
    Entonces el sistema mostrará la imagen
    Y mostrará el mensaje informando que no hay resultados para la búsqueda
