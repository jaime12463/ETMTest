# language: es

@Pedido @Validar_unidades @Unidades_maximas_por_producto @Sprint3 @Sprint8

# Si al ingresar las unidades se excede la cantidad máxima permitida, 
# el sistema avisa: "La cantidad es mayor a X. Desea Continuar?"  
# Si responde "Si", continua con la toma del pedido según botelleo habilitado o no. 
# Si responde "No", se queda en el campo para que pueda corregir. 
#
# Nuevo dato del cliente “cantidadMaximaUnidades” que indica la 
# cantidad máxima de cajas que se pueden ingresar para un producto. (Opcional)
# Si este dato no viene informado, se asume el valor como el entero más grande
# Esta cantidad máxima aplicará a todos los tipos de operación 
# donde se capturen productos..

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Ingresar unidades
	Como prevendedor
	Quiero ingresar una cantidad de unidades del producto al pedido 
	Para realizar la venta.
 
Antecedentes:
	Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
   	Y que la cantidad máxima de unidades se estableció en 100 para el cliente

@Test_dispositivo_1
Esquema del escenario: N°1 – La cantidad es mayor a la permitida
	Cuando se ingresa <cantidad>
	Y es mayor a la cantidad máxima de unidades
	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo

Ejemplos:
|cantidad|
|   101  |
|   110  |

Escenario: N°2 – La cantidad es menor o igual a la permitida y las subunidades están habilitadas
	Cuando se ingresa una cantidad
	Y es menor o igual a la cantidad máxima de unidades
	Y las subunidades están habilitadas
	Entonces el sistema registrará las unidades y continuará con el ingreso de las subunidades

Escenario: N°3 – La cantidad es menor o igual a la permitida y las subunidades están deshabilitadas
	Cuando se ingresa una cantidad
	Y es menor o igual a la cantidad máxima de unidades
	Y las subunidades no están habilitadas
	Entonces el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.
 
#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 
