# language: es

@Pedido @PromocionOngoing @Editar @Sprint23

Característica: Editar promocion ongoing
    Como prevendedor
    Quiero editar una promocion ongoing
    Para otorgar manualmente el beneficio

Esquema del escenario: N°1 - Editar promociones ongoing manuales
	Dado que tenemos promociones ongoing manuales disponibles para aplicar 
	Cuando seleccionamos el control editar
	Entonces el sistema contraerá las otras promociones que estén abiertas
	Y desplegará la promoción seleccionada
	Y mostrará el control combo grupos, que contiene los grupos del beneficio ordenados por _grupoBeneficioId con el primer grupo seleccionado
	Y visualizando la _descripción
	Y mostrará el control combo secuencia, que contiene las secuencias del beneficio ordenadas por _secuencia con la primer secuencia seleccionada
	Y visualizando la _secuencia
	Y mostrará el beneficio como '<beneficio>' cuando la secuencia tenga _formaBeneficio <_formaBeneficio>
	Y mostrará el control para aplicar el beneficio
	Y mostrará el listado de productos que tiene la secuencia seleccionada
	Y mostrará para cada producto, el _codigoProducto, _nombre, _atributos, _unidadMedida y presentación
	Y los controles para ingresar cantidades
	Y establecerá las cantidades según el beneficio default calculado en promociones
	Y mostrará el disponible, como la cantidad obtenida por el calculo de la promoción - la suma de las cantidades establecidas en el listado de productos de la secuencia seleccionada
	Y mostrará el control para contraer la promoción
	
Ejemplos:
    |     beneficio              |_formaBeneficio|
    | Beneficio: obsequio        |       1       |
    | Beneficio: 10,30%          |       2       |
    | Beneficio: $-54,12         |       3       |
    | Precio recuperacion: $34,12|       4       |

Escenario: N°2 - Cambiar grupo beneficio
	Dado que estamos editando una promocion ongoing
	Cuando seleccionamos el control combo grupos
	Y cambiamos el grupo
	Entonces el sistema mostrará el combo secuencia con las secuencias del grupo seleccionado, preseleccionado la primer secuencia
	Y mostrará el beneficio según la forma beneficio de la secuencia
	Y mostrará el listado de productos que contiene la secuencia seleccionada
	Y establecerá las cantidades según el beneficio default calculado en promociones
	Y mostrará el disponible como la cantidad obtenida por el calculo de la promoción - la suma de las cantidades establecidas en el listado de productos de la secuencia seleccionada

# si forma beneficio es obsequio: "Beneficio: Obsequio"
# si forma beneficio es $ descuento: "Beneficio: $-50,30"
# si forma beneficio es % descuento: "Beneficio: 10,50%"
# si forma beneficio es precio recupero: "Precio recuperación: $30,00"

Escenario: N°3 - Cambiar secuencia
	Dado que estamos editando una promocion ongoing
	Cuando seleccionamos el control combo secuencia
	Y cambiamos una secuencia
	Entonces el sistema guardará lo ingresado en la secuencia anterior
	Y mostrará el beneficio de la secuencia seleccionada según la forma beneficio de la secuencia
	Y mostrará el listado de productos que contiene la secuencia seleccionada
	Y mostrará las cantidades ingresadas en los productos de la secuencia
	Y mostrará el disponible como la cantidad obtenida por el calculo de la promoción - la suma de las cantidades establecidas en el listado de productos de la secuencia seleccionada
	

Escenario: N°4 - Ocultar o contraer promocion 
	Dado que estamos editando una promocion ongoing 
	Cuando seleccionamos el control para contraer la promoción
	Entonces el sistema contraerá la promoción. 

Esquema del escenario: N°5 - Ingresar cantidades
	Dado que estamos editando una promocion ongoing con forma beneficio '<beneficio>'
	Cuando ingresamos cantidad a un producto
	Entonces el sistema '<realizaraAccion>'
    Y restará al disponible lo ingresado si el disponible > 0
		
Ejemplos:
    |beneficio       |realizaraAccion                                                                                           |
    | obsequio       | no permitirá ingresar más cantidad que la disponible                                                     |
    | % descuento    | no permitirá ingresar más cantidad que la cantidad ingresada de producto en el pedido y que el disponible|
    | $ descuento    | no permitirá ingresar más cantidad que la cantidad ingresada de producto en el pedido y que el disponible|
    | precio recupero| no permitirá ingresar más cantidad que la cantidad ingresada de producto en el pedido y que el disponible|

#repartir cantidades como lo hace envases: retorno con venta y con prestamo

Esquema del escenario: N°6 - Control aplicar beneficio
	Dado que estamos editando una promocion ongoing de asignación <asignacion>
	Y el disponible '<condicion>'
	Cuando seleccionamos el control aplicar beneficio
	Entonces el sistema '<realizaraAccion>'
	
Ejemplos:
    |asignacion|condicion                                     |realizaraAccion                                                                                                                                             |
    | Total    | es igual a 0 en todas las secuencias         | aplicará los beneficios con los productos que tienen cantidades ingresadas en todas las secuencias del grupo seleccionado según aplicar promocion ongoing  |
    | Total    | mayor a cero en al menos una secunecia       | mostrará el toast de error indicando que se debe asignar el total del beneficio                                                                            |
    | Parcial  | es mayor o igual a 0 en todas las secuencias | aplicará los beneficios con los productos que tienen cantidades ingresadas en todas las secuencias del grupo seleccionado según aplicar promocion ongoing  |   

	