@Permitir_ingreso_de_subunidades @Sprint3

# Si parámetro a nivel ruta esVentaSubunidadesRuta = true y para el cliente/ producto 
# esVentaSubunidades = true se habilita el campo de ingreso de subunidades. 
# El usuario puede ingresar subunidades menores a “presentación” del producto. 
# Si ingresa un número mayor se muestra aviso.
# Caso contrario, no se habilita el campo de ingreso de subunidades.  
# Se agrega campo esVentaSubunidades en portafolio de productos del cliente. 
# Se agrega campo presentación en el catálogo de productos. (presentación: 12)
# Parámetro a nivel ruta esVentaSubunidadesRuta que habilita venta en botellas. 
# Si es true, la venta en botellas depende de esVentaSubunidades del cliente/ producto. 
# Si está en false, no se puede vender en botellas.


Característica: Permitir el ingreso de subunidades al pedido
	Como Prevendedor
	Quiero ingresar en el pedido subunidades de SKUs
	Para realizar venta mínima sin tener que vender cajas completas

Antecedente:
Dado un cliente y producto seleccionado 

@Test_dispositivo_1
Esquema del escenario N°1: Se admite el ingreso de subunidades por cliente/producto
    Cuando para la ruta está configurado el botelleo igual a <esVentaSubunidadesRuta> 
    Y para el cliente/producto está configurado el botelleo igual a <esVentaSubunidades> 
    Entonces el sistema <habilitaSubunidades> el ingreso de subunidades


Ejemplo:
|esVentaSubunidadesRuta|esVentaSubunidades| habilitaSubunidades |
|      true 		   |      true		  |     Habilitará      |  
|      true            |	  false		  |    No habilitará    |
|      false           |	  true	      |    No habilitará    |
|      false           |	  false		  |    No habilitará    |

@Test_dispositivo_2
Escenario: N°2 – Validar Subunidades con la presentación
	Dado que el producto ingresado tiene presentación <presentación>
	Cuando se ingresan <subunidades> 
	Entonces el sistema <acción> 

Ejemplo:
|presentación |subunidades| acción                                                                				| 
|    12       |   11      |  permitirá el ingreso del producto en el pedido                       				|
|    12	      |	   5      |  permitirá el ingreso del producto en el pedido                       				|
|    12       |   12      |  mostrará mensaje “Las subunidades deben ser menores a la presentación del producto”|
|    12  	  |   20      |  mostrará mensaje “Las subunidades deben ser menores a la presentación del producto”|    
