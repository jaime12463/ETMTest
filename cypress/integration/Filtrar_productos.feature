# language: es

@Pedido @Filtrar_productos @Srptin19

# _atributos_ son aquellos definidos como Marca, Envase, Familia, Sabores, Medida
# El Contador deberá de sumar por cada atributo que este seleccionado, 
# es decir si en sabores selecciona 3 atributos deberá de aparecer el numero 3.
# Cardenas 23/02/2022

Característica: Filtrar productos
    Como prevendedor 
    Quiero filtrar los productos habilitados para el tipo de pedido actual
    Para encontrar algún producto que requiere el cliente

Antecedentes:
    Dado que el prevendedor seleccionó un _tipoPedido 
    Y seleccionó el control para buscar productos 

Escenario: N°1 - Abrir filtros de productos
    Cuando selecciono el control de filtros
    Entonces el sistema mostrará el listado de _atributos_ correspondientes a los productos que tiene el cliente en portafolio vigente
    Y que no sean productos promo push
    Y ordenadas alfabéticamente ascendente para seleccionar

Esquema del escenario: N°2 - Filtrar producto de portafolio vigente cuando el tipo de pedido no valida presupuesto
    Dado que el _tipoPedido tiene _validaPresupuesto = false
    Y tiene portafolio asignado con precio y vigencia inicial y vigencia final
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará solamente los productos cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso 
    Y que no sean productos promo push
    Y que tenga el _atributo seleccionado
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y ordenados ascendente por código de producto
    Y llevará la suma de filtros aplicados en el control de filtro

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 



Esquema del escenario: N°3 - Filtrar producto en portafolio vigente con presupuesto de canje cuando no tiene lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido tiene _tieneProductosHabilitados = false
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará los productos del portafolio asignado al cliente cuyo _tipoProducto sea el _tipoProductosHabilitados para el tipo de pedido en curso
    Y que tenga el atributo seleccionado
    Y que no sean productos promo push
    Y cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y ordenados ascendente por código de producto
    Y llevará la suma de filtros aplicados en el control de filtro

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 


Esquema del escenario: N°4 - Buscar producto en portafolio vigente con presupuesto de canje cuando existe lista de productos habilitados
    Dado que el _tipoPedido tiene _validaPresupuesto = true
    Y el _presupuestoTipoPedido tiene _tieneProductosHabilitados = true
    Cuando se selecciona una opción del filtro
    Entonces el sistema mostrará los _productosHabilitados en el presupuesto con _vigenciaInicioPresupuesto <= fecha del dispositivo <= _vigenciaFinPresupuesto
    que estén en el portafolio del cliente cuyo precio cumpla <vigenciaInicioPrecio> <= <fechaEntrega> <= <vigenciaFinPrecio>
    Y que tenga el atributo seleccionado
    Y que no sean productos promo push
    Y ordenados ascendente por código de producto
    Y llevará la suma de filtros aplicados en el control de filtro

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
    Y ordenados ascendente por código de producto
    Y que no sean productos promo push
    Y llevará la suma de filtros aplicados en el control de filtro
    

Escenario: N°6 - Borrar selección de filtros
    Dado que se ingresaron opciones de filtros
    Cuando se selecciona el control borrar selección
    Entonces el sistema restablecerá los filtros a su estado inicial
    Y descartará los filtros aplicados a los resultados obtenidos en la búsqueda de productos
    Y borrará la indicación de la suma de filtros aplicados en el control de filtro

Escenario: N°7 - Contraer sección de filtro
    Dado que se desplegó una sección del filtro
    Cuando se selecciona el control para contraer de una sección
    Entonces el sistema contraerá la sección ocultando los atributos contenidos

Escenario: N°8 - Desplegar sección de filtro
    Dado que se contrajo una sección del filtro
    Cuando se selecciona el control para desplegar de una sección
    Entonces el sistema desplegará la sección haciendo visibile los atributos contenidos