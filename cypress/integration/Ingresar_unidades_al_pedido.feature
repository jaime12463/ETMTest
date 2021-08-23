# language: es

@Pedido @Validar_unidades @Unidades_maximas_por_producto @Sprint3 @Sprint8 @Sprint9 @Sprint10

Característica: Ingresar unidades
Como prevendedor
Quiero ingresar una cantidad de unidades del producto al pedido
Para realizar la venta.

#Validación “cantidadMaximaUnidades”. Dato del cliente “cantidadMaximaUnidades” que indica la
#cantidad máxima de cajas que se pueden ingresar para un producto. (Opcional)
#Esta cantidad máxima aplicará a todos los tipos de operación donde se capturen productos..
#Si este dato no viene informado, se asume el valor como el entero más grande
#Si al ingresar las unidades se excede la cantidad máxima permitida,
#el sistema avisa: "La cantidad es mayor a X. Desea Continuar?"
#Si responde "Si", continua con la toma del pedido según botelleo habilitado o no.
#Si responde "No", se queda en el campo para que pueda corregir.
#
#Validación "disponible". Dato del producto en el portafolio del cliente (Opcional)
#Si este dato no viene informado, se asume el valor como el entero más grande
#Las unidades ingresadas no pueden ser mayores a las unidades Disponibles del producto,
#informadas en el portafolio del cliente.

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Ingresar unidades
	Como prevendedor
	Quiero ingresar una cantidad de unidades del producto al pedido 
	Para realizar la venta.

Antecedentes:
	Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
	Y que la _cantidadMáximaUnidades se estableció en 100 para el cliente
	# Y que las unidades disponibles se establecieron en 1000 = unidades disponibles del producto para el cliente – unidades vendidas del producto en otros pedidos del cliente.

@Test_dispositivo_1
Escenario: N°1 – La cantidad es mayor a la permitida y menor a las unidades disponibles
	Cuando se ingresan unidades mayores a _cantidadMáximaUnidades
	Y es menor o igual a las unidades disponibles del producto para el cliente
	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo

Escenario: N°2 – La cantidad es menor o igual a la permitida y  menor a las unidades disponibles y las subunidades están habilitadas
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y _esVentaSubunidades = true
Entonces el sistema registrará las unidades y continuará con el ingreso de las subunidades

Escenario: N°3 – La cantidad es menor o igual a la permitida y las subunidades están deshabilitadas
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y _esVentaSubunidades = false
Entonces el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.

#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

Escenario: N°4 – La cantidad es mayor a las unidades disponibles del producto para el cliente.
Cuando se ingresan unidades mayores a _unidadesDisponibles del producto para el cliente
Entonces el sistema mostrará el mensaje “La cantidad es mayor al disponible: 10” y permanece en el campo para que el prevendedor pueda corregir la cantidad

