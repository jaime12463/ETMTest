# language: es

@Pedido @PromocionOngoing @Editar @Sprint23


Característica: Desplegar promocion ongoing
    Como prevendedor
    Quiero ver una promocion ongoing
    Para conocer la composición de la promoción

Esquema del escenario: N°1 - Desplegar promociones ongoing sin aplicar que cumple requisito
	Dado que tenemos promociones ongoing sin aplicar que cumplen requisito
	Cuando seleccionamos el control ver detalle
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

Esquema del escenario: N°2 - Desplegar promociones ongoing aplicadas
	Dado que tenemos promociones ongoing aplicadas
	Cuando seleccionamos el control ver detalle
	Entonces el sistema contraerá las otras promociones que estén abiertas
	Y desplegará la promoción seleccionada
	Y mostrará todos los controles deshabilitados
	Y mostrará el control combo secuencia habilitado, que contiene las secuencias del beneficio ordenadas por _secuencia con la primer secuencia seleccionada
	Y visualizando la _secuencia
	Y mostrará el beneficio como '<beneficio>' cuando la secuencia tenga _formaBeneficio <_formaBeneficio>
	Y mostrará el listado de productos que tiene la secuencia seleccionada
	Y mostrará para cada producto, el _codigoProducto, _nombre, _atributos, _unidadMedida y presentación
	Y mostrará las cantidades ingresadas en los productos que corresponda
	Y mostrará el disponible, como la cantidad obtenida por el calculo de la promoción - la suma de las cantidades establecidas en el listado de productos de la secuencia seleccionada
	Y mostrará el control para contraer la promoción habilitado
	
Ejemplos:
    |     beneficio              |_formaBeneficio|
    | Beneficio: obsequio        |       1       |
    | Beneficio: 10,30%          |       2       |
    | Beneficio: $-54,12         |       3       |
    | Precio recuperacion: $34,12|       4       |


Escenario: N°3 - Desplegar promociones ongoing que no cumplen requisito
	Dado que tenemos promociones ongoing que no cumplen con requisitos
	Cuando seleccionamos el control ver detalle
	Entonces el sistema contraerá las otras promociones que estén abiertas
	Y desplegará la promoción seleccionada
	Y mostrará los productos que son requisito de la promoción
	Y mostrará la cantidad
	Y mostrará la unidad de medida
# confirma Cardenas el 23/02/2022 por mail


Escenario: N°4 - Ocultar o contraer promocion 
	Dado que se desplegó una promocion ongoing 
	Cuando seleccionamos el control para contraer la promoción
	Entonces el sistema contraerá la promoción. 