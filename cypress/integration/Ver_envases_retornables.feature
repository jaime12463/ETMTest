# language: es

@Pedido @Ver_envases @Sprint8 @Sprint11

# Sprint11: se toma en cuenta para la generación de envases, aquellos envases derivados de las promo push
# Cuando la unidad de medida es "CAJ" se agregan el implícito 1 e implícito 2 donde la cantidad son unidades
# Cuando la unidad de medida es "BOT" se agrega solo el implicito 1 donde la cantidad son subunidades
# Aquellos productos componentes de la promoción cuyo codigo de producto es un implícito, se debe restar 
# del cálculo de envases

# Botón para ver envases, al lado de ver detalle.
# Al seleccionarlo, se abre pantalla similar al detalle del pedido, pero con el listado de envases consolidados.
# Datos nuevos del producto: “implícito1”, “implicito2” -- opcionales

# Mostrar en la lista, código de producto, descripción, unidades y subunidades. Ordenados por código de producto ascendente.
# Consolidar la lista por código de producto.
# Implícito1 y Implícito2 son productos informados en el catálogo de productos

# Asumimos que la presentación de Implícito1 es igual a la presentación de <producto> y la de Implícito2 es igual a 1
# Implicito1 son las N botellas vacías, donde n es la presentación del producto
# Implicito2 es la caja plástica 

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ver envases retornables
	Como prevendedor
	Quiero ver los envases retornables del pedido
	Para informarle al cliente 

Escenario: N°1 – El producto del pedido no tiene Implícito1 ni Implícito2 informado
	Dado que se realizó la venta de un producto 
	Y que el producto no es promo push 
	Y no tiene _Implícito1
	Y tampoco tiene _Implícito2 informados
	Cuando quiero ver los envases retornables
	Entonces el sistema no muestra envases para ese producto

Esquema del escenario: N°2 – El producto del pedido tiene Implícito1 informado
	Dado que se realizó la venta de '<cantidadUnidades>' y '<cantidadSubunidades>' de '<producto>' 
	Y éste tiene '<implicito1>' informado
	Cuando quiero ver los envases retornables del pedido
	Entonces el sistema mostrará '<implicito1>' con '<cantidadUnidades>' y '<cantidadSubunidades>' para retorno

Ejemplos:
	|producto|cantidadUnidades|cantidadSubunidades|implicito1|	
	|360	 | 10	          |2                  |	1001	|
	|365	 |15	          |5	              | 1010	|
	|380	 |15	          |0	              | 1001	|
	|400	 |0	              |3	              | 1001	|

Esquema del escenario: N°3 – El producto del pedido tiene Implícito2 informado
	Dado que se realizó la venta de '<cantidadUnidades>' mayores a cero del '<producto>' 
	Y éste tiene '<implicito2>' informado
	Cuando quiero ver los envases retornables del pedido
	Entonces el sistema mostrará '<implicito2>' con '<cantidadUnidades>' para retorno

Ejemplos:
	|producto|cantidadUnidades|implicito2|	
	|360	 |10	          |	1020	|
	|365	 |15	          | 1020	|
	|380	 |15	          | 1020	|
	|400	 |0	              | 1020	|

# Explicación escenario N°4
# Dado que el _producto promo push con _codigoProducto 10010, tiene los siguientes _componentes
#	|_codigoProducto|_cantidad|_unidadMedida| 
#	| 360           |     2   |  CAJ        | 
#   | 380           |     6   |  BOT        |  
#	| 1001          |     1   |  CAJ        |
#   | 1020          |     1   |  CAJ        |
#   | 1001          |     3   |  BOT        |
#
# y los productos tienen _presentacion = 12 y los siguientes implicitos
#
#	|_codigoProducto| implicito1 | implicito2 |
#	| 360           |   1001     |   1020     |
#   | 380           |   1001     |   1020     | 
#
# Cuando en el componente se informa _unidadMedida= "CAJ", la _cantidad corresponde a unidades
# Cuando en el componente se informa _unidadMedida= "BOT", la _cantidad corresponde a subunidades
# Para cada _componente que tiene informado algún implícito, se generan los envases para
# retorno como se indica en los escenarios anteriores, teniendo en cuenta que la _cantidad se 
# debe multiplicar por la cantidad de unidades vendidas de la promo push
# Entonces la promo push se puede desmenuzar de la siguiente manera
#
# |producto|cantidadUnidades|_cantidad|_unidadMedida| unidades|subunidades
# |360	   |        3 	    | 	  2   |      CAJ   	|	6	  |		 0
# |380	   |        3	    |     6   |      BOT	|	0 	  |  	18
# |1001	   |        3 	    | 	  1   |      CAJ   	|	3	  |		 0
# |1020	   |        3	    |     1   | 	 CAJ	|	3 	  |  	 0
# |1001	   |        3 	    | 	  3   |      BOT   	|	0	  |		 9
#
# Primero se calculan los retornables de los producto que tienen implícitos, según se indica en los
# escenarios anteriores, dando por resultado la siguiente tabla:
#
# |envase|unidades|	subunidades|
# |1001  |       6|          18| 
# |1020  |       6|			   |
# 
# A ese resultado se le restan los envases que aparecen en la promo push
# |producto|cantidadUnidades|_cantidad|_unidadMedida| unidades|subunidades
# |1001	   |        3 	    | 	  1   |      CAJ   	|	3	  | 		0
# |1020	   |        3	    |     1   |	     CAJ	|	3 	  |		  	0
# |1001	   |        3 	    |	  3   |      BOT   	|	0	  | 		9
#
#Entonces los envases de la promo push serían los siguientes:
# |envase |	unidades |	subunidades |
# |1001   |    3     |        9     |
# |1020   |    3     |              |
#
#
# En resumen, el sistema calcula y consolida, por código de producto, la siguiente tabla
#	|codigoProducto | cantidadUnidades | _cantidad | _unidadMedida | unidades | subunidades |
#	|1001			|		 3   	   |	  2    |       CAJ	   |	6     |      0      |
#	|1020           |        3         |      2    |       CAJ     |    6     |      0      |
#	|1001           |        3		   |	  6	   |	   BOT     |    0     |     18      |
#	|1001           |        3         |      1    |       CAJ     |   -3     |      0      |
#	|1020           |        3         |      1    |       CAJ     |   -3     |      0      |
#	|1001           |        3         |      3    |       BOT     |    0     |     -9      |	
#
#En caso de que se tengan que pasar a unidades las subunidades que excedan a la presentación
#La parte entera de la división de las subunidades/presentación se suma a las unidades y el resto 
#queda como subunidades

Esquema del escenario: N°4 - Contabilizar envases de productos promo push
	Dado que se realizó la venta <cantidadUnidades> de un producto Promo Push <codigoPromo>
	Cuando quiero ver los envases retornables del pedido  
	Entonces el sistema mostrará
	|envase| unidades |subunidades|
    | 1001 |     3    |    9      |
    | 1020 |     3    |           |

Ejemplos:
	|codigoPromo|cantidadUnidades|
	|   10010   |  3             |


#Explicación escenario N°5
# Se asume que los productos ingresados tienen _presentacion=12 y los siguientes implícitos
# |producto|implicito1|Implícito2| 
# | 360    | 1001     |	1020     |
# | 365	   | 1010     |          |	
# | 380	   | 1001     | 1020     |
# | 390	   |     	  |          |
# | 400	   | 1001     |	1020     |
#
#El calculo de los envases retornables se realiza, para cada producto, según se indica
#en los escenarios anteriores, dando por resultado los siguientes implicitos.
#|producto|implicito1|Unidades|subunidades|
#| 360 	  | 1001     |  10    |		6     |
#| 360	  | 1020	 |  10    |           |  
#| 365	  | 1010	 |  15    |           |
#| 380	  | 1001	 |  15	  |           |
#| 380	  | 1020	 |  15    |           |
#| 400	  | 1001	 |   0	  |     9     |
#| 10010  | 1001	 |   3    |     9     |
#| 10010  | 1020	 |   3    |           |
#
#luego se consolida por implicito, ordenado por el codigo del implicito
#
#|implicito| unidades |	subunidades|
#| 1001	   |   28	  |	   24      |
#| 1010	   |   15	  |		0      |
#| 1020	   |   18     |            |
#
#En caso de que se tengan que pasar a unidades las subunidades que excedan a la presentación
#La parte entera de la división de las subunidades/presentación se suma a las unidades y el resto 
#queda como subunidades
#|implicito| unidades |	subunidades|
#| 1001	   |   30	  |		0      |
#| 1010	   |   15	  |		0      |
#| 1020	   |   18     |            | 


Escenario: N°5 - Consolidar los retornables del pedido
	Dado que se capturó el siguiente pedido
	|producto|cantidadUnidades|cantidadSubunidades|
	| 360	 |      10	      |       6           |
	| 365	 |      15	      |       5	          |	
	| 380	 |      15	      |       0	          | 
	| 390	 |       5	      |       5		      |
	| 400	 |       0	      |       9	          | 
	| 10010  |       3        |       0           |   
	Cuando quiero ver los envases retornables del pedido  
	Entonces el sistema mostrará
	|implicito| unidades |subunidades|
	|1001	  |		28	 | 		24   | 
	|1010	  |		15	 | 		 0   |
	|1020	  |		18   |		 0	 |


