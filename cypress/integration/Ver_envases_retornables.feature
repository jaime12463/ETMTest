# language: es

@Pedido @Ver_envases @Sprint8 @Sprint11

# Sprint11: se toma en cuenta para la generación de envases, aquellos envases derivados de las promo push
# Cuando la unidad de medida es "CAJ" se agregan el implícito 1 e implícito 2 donde la cantidad son unidades
# Cuando la unidad de medida es "BOT" se agrega solo el implicito 1 donde la cantidad son subunidades
# Aquellos productos componentes de la promoción cuyo codigo de producto es un implícito correspondiente a otro
# codigo de producto que compone a la promoción, se debe restar del cálculo de envases

# Botón para ver envases, al lado de ver detalle.
# Al seleccionarlo, se abre pantalla similar al detalle del pedido, pero con el listado de envases consolidados.
# Datos nuevos del producto: “implícito1”, “implicito2” -- opcionales

# Mostrar en la lista, código de producto, descripción, unidades y subunidades. Ordenados por código de producto ascendente.
# Consolidar la lista por código de producto.
# Implícito1 y Implícito2 son productos informados en el catálogo de productos

# Asumimos que la presentación de Implícito1 es igual a la presentación de <producto> y la de Implícito2 es igual a 1
# Implicito1 son las N botellas vacías, donde n es la presentación del producto
# Implicito2 es la caja plástica 

# Dado el siguiente pedido
# |producto|cantidadUnidades|cantidadSubunidades|implicito1|Implícito2
# 360	           10	             2            	1001	1020
# 365	           15	             5	            1010	
# 380	           15	             0	            1001	1020
# 390	            5	             5		
# 400	            0	             3	            1001	1020
# 10010             3                0              

# siendo 10010 producto promo push compuesto por:
# 360 cantidad 2, unidad de medida CAJ 
# 380 cantidad 6, unidad de medida BOT  
# 1001 cantidad 1, unidad de medida CAJ. Caja es igual a unidad
# 1020 cantidad 1, unidad de medida CAJ. Caja es igual a unidad
# 1001 cantidad 3, unidad de medida BOT. Botella es igual a subunidad
# 
# |producto|cantidadUnidades|cantidadSubunidades|implicito1|Implícito2
# 360	           2 x 3 = 6	     0            	1001	1020
# 380	           0	             6 x 3 = 18	    1001	1020
# 
# envases se vería de la siguiente forma: 
# envase	unidades	Subunidades
# 1001         6             18 ->    1 unidad 6 subunidades
# 1020         6

# envase	unidades	Subunidades
# 1001         7             6
# 1020         6

# a este resumen se deben restar los componentes de la promo push que estan en la lista de envases a retornar (tipo de producto 5)

# 1001 = 1 x 3 = 3 unidades
# 1020 = 1 x 3 = 3 unidades
# 1001 = 3 x 3 = 9 subunidades

# se restan las cantidades:
# envase	unidades	Subunidades
# 1001         7 - 3            6 - 9
# 1020         6 - 3

# envase	unidades	Subunidades
# 1001         6 - 3          12 + 6 - 9
# 1020         6 - 3

# envase	unidades	Subunidades
# 1001         3             9
# 1020         3



# pasar todo a subunidades según presentación, realizar calculos y volver a convertir a unidades.
#         unidades * presentacion + subunidades -  
# 1001 = (32 * 12) + 11 - (6 * 12) - 18 = 395 - 72 - 18 = 305
# 1010 = (15 * 12) + 5  - 0 =
# 1020 = (31 * 12) - (6 * 12) =

# Finalmente se muestra: 
# envase	unidades	Subunidades
# 1001	      32	         11
# 1010	      15	         5
# 1020	      31	



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

# explicación escenario 4
#que tiene los _componentes
#	|_codigoProducto|_cantidad|_unidadMedida| implicito1 | implicito2 |
#	| 360           |     2   |  CAJ        |   1001     |   1020    |
#    | 380           |     6   |  BOT        |   1001     |   1020    | 
#	| 1001          |     1   |  CAJ        |
#    | 1020          |     1   |  CAJ        |
#    | 1001          |     3   |  BOT        |
#el sistema calculará
#	|codigoProducto | cantidadUnidades | _cantidad | _unidadMedida | unidades | subunidades |
#	|1001			|		3			|	2      |       CAJ		|	6     |    0        |
#	|1020           |         3         |      2   |          CAJ   |   6     |    0        |
#	|1001           |         3			|	6		|		BOT     |   0     |     18      |
#	|1001           |        3          |      1    |          CAJ  |   -3    |      0      |
#	|1020           |        3          |      1    |          CAJ  |   -3    |      0      |
#	|1001           |        3          |      3    |          BOT  |   0     |     -9      |	

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



Escenario: N°4 - Contabilizar envases de productos promo push
	Dado que se realizó la venta <cantidadUnidades> de un producto Promo Push
	que tiene los _componentes
	|_codigoProducto|_cantidad|_unidadMedida|
	| 360           |     2   |  CAJ        | 
    | 380           |     6   |  BOT        |
	| 1001          |     2   |  CAJ        |
    | 1020          |     2   |  CAJ        |
    | 1001          |     6   |  BOT        |
	Cuando quiero ver los envases retornables del pedido  
	Entonces el sistema mostrará
	|envase| unidades |subunidades
    | 1001 |     3    |    9
    | 1020 |     3    |

# Cuando la unidad de medida es "CAJ" se agregan el implícito 1 e implícito 2 donde la cantidad son unidades
# Cuando la unidad de medida es "BOT" se agrega solo el implicito 1 donde la cantidad son subunidades


Escenario: N°5 - 


