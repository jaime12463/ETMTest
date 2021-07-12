# language: es

@Pedido @Validar_unidades @Unidades_maximas_por_producto @Sprint3

# Si al ingresar las unidades se excede la cantidad máxima permitida, 
# el sistema avisa: "La cantidad es mayor a X. Desea Continuar?"  
# Si responde "Si", continua con la toma del pedido. 
# Si responde "No", se queda en el campo para que pueda corregir. 
#
# Nuevo dato del cliente “cantidadMaximaUnidades” que indica la 
# cantidad máxima de cajas que se pueden ingresar para un producto. (Opcional)
# Si este dato no viene informado, se asume el valor como el entero más grande
# Esta cantidad máxima aplicará a todos los tipos de operación 
# donde se capturen productos..

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Aviso en ingreso de unidades maximas por producto
	Como prevendedor
	Quiero que al ingresar una cantidad mayor a 100 en las unidades el sistema me avise
	Para corregir los datos si fuera necesario.
 
Antecedentes:
	Dado que la cantidad máxima de unidades se estableció en 100 para el cliente

@Test_dispositivo_1
Esquema del escenario: N°1 – La cantidad es mayor a la permitida
	Cuando se ingresa <cantidad> 
	Y es mayor a la cantidad máxima de unidades
	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” (Si/No)

Ejemplos:
|cantidad|
|   101  |
|   110  |

Esquema del escenario: N°2 – La cantidad es menor o igual a la permitida
	Cuando se ingresa <cantidad>
	Y es menor o igual a la cantidad máxima de unidades
	Entonces el sistema continuará con el ingreso del pedido.

Ejemplos:
|cantidad|
|   99   |
|   100  |

