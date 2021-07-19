# language: es

@Pedido @Ver_envases @Sprint8

# Botón para ver envases, al lado de ver detalle.
# Al seleccionarlo, se abre pantalla similar al detalle del pedido, pero con el listado de envases consolidados.
# Datos nuevos del producto: “implícito1”, “implicito2” -- opcionales

# Mostrar en la lista, código de producto, descripción, unidades y subunidades. Ordenados por código de producto ascendente.
# Consolidar la lista por código de producto.
# Implícito1 y Implícito2 son productos informados en el catálogo de productos

# Asumimos que la presentación de Implícito1es igual a la presentación de <producto> y la de Implícito2 es igual a 1
# Implicito1 son las N botellas vacías, donde n es la presentación del producto
# Implicito2 es la caja plástica 

# Dado el siguiente pedido
# |producto|cantidadUnidades|cantidadSubunidades|implicito1|Implícito2
# 360	           10	             2            	1001	1020
# 365	           15	             5	            1010	
# 380	           15	             0	            1001	1020
# 390	            5	             5		
# 400	            0	             3	            1001	1020

# Se muestra:
# Envases retornables:
# envase	unidades	Subunidades
# 1001	     25	             5
# 1010	     15	             5
# 1020	     25	


# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ver envases retornables
	Como prevendedor
	Quiero ver los envases retornables del pedido
	Para informarle al cliente 

Escenario: N°1 – El producto del pedido no tiene Implícito1 ni Implícito1 informado
	Dado que se realizó la venta de un producto que no tiene Implícito1
	ni Implícito2 informados
	Cuando quiero ver los envases retornables
	Entonces el sistema no muestra envases para ese producto

Esquema del escenario: N°2 – El producto del pedido tiene Implícito1 informado
	Dado que se realizó la venta de <cantidadUnidades> y <cantidadSubunidades> de <producto> 
	Y éste tiene <implicito1> informado
	Cuando quiero ver los envases retornables del pedido
	Entonces el sistema mostrará <implicito1> con <cantidadUnidades> y <cantidadSubunidades> para retorno

Ejemplos:
|producto|cantidadUnidades|cantidadSubunidades|implicito1|	
|360	 | 10	          |2                  |	1001	|
|365	 |15	          |5	              | 1010	|
|380	 |15	          |0	              | 1001	|
|400	 |0	              |3	              | 1001	|

Esquema del escenario: N°3 – El producto del pedido tiene Implícito2 informado
	Dado que se realizó la venta de <cantidadUnidades> mayores a cero del <producto> 
	Y éste tiene <implicito2> informado
	Cuando quiero ver los envases retornables del pedido
	Entonces el sistema mostrará <implicito2> con <cantidadUnidades> para retorno

Ejemplos:
|producto|cantidadUnidades|implicito2|	
|360	 |10	          |	1020	|
|365	 |15	          | 1020	|
|380	 |15	          | 1020	|
|400	 |0	              | 1020	|





