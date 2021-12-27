# language: es

@Pedido @Filtrar_productos @Srptin19

Característica: Filtrar productos
    Como prevendedor 
    Quiero filtrar los productos habilitados para el tipo de pedido actual
    Para encotrar algún producto que requiere el cliente

Antecedentes:
    Dado que el prevendedor seleccionó un pedido cuyo _tipoPedido es un _tipoPedidoHabilitados 

Escenario: N°1 - Abrir filtros de productos
    Cuando selecciono el control de filtros
    Entonces el sistema mostrará el listado de atributos con las opciones para seleccionar

Esquema del escenario: N°2 - Filtrar producto de portafolio vigente cuando el tipo de pedido no valida presupuesto
    Dado que el _tipoPedido tiene _validaPresupuesto = false
    Y tiene portafolio asignado con precio y vigencia inicial y final
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará solamente los productos cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso 
    Y que no sean productos promo push
    Y que tenga el atributo seleccionado
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 



Esquema del escenario: N°3 - Filtrar producto en portafolio vigente con presupuesto de canje cuando no tiene lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y _tieneProductosHabilitados = false
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y que tenga el atributo seleccionado
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°4 - Buscar producto en portafolio vigente con presupuesto de canje cuando existe lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y _tieneProductosHabilitados = true
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará los _productosHabilitados en el presupuesto con _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto
    que estén en el portafolio del cliente cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y que tenga el atributo seleccionado

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 

Escenario: N°5 - Filtrar productos habiendo ingresado una búsqueda de producto previamente
    Dado que se ingresó una búsqueda de productos
    Y se mostró un listado con los resultados de la búsqueda
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará aquellos productos del listado de resultados que tengan el atributo seleccionado
    