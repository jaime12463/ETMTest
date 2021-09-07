# language: es

@Pedido @Validar_unidades @Unidades_maximas_por_producto @Sprint3 @Sprint8 @Sprint9 @Sprint10 @Sprint11

# Sprint11:
# Validación de presupuesto y productos habilitados para el tipo de pedido
# Cuando se ingresa un producto en canje se tiene que validar la cantidad de unidades + subunidades, contra el presupuesto tipo de pedido - los productos que ya se registraron para ese tipo de pedido en todos cliente de la ruta.
#
# Calculo del presupuesto disponible del producto
# presupuestoActual = _presupuesto - (unidades + subunidades) 
#    unidades = sumatoria de las unidades de todos los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta 
#    subunidades = (sumatoria de las subunidades / presentación, de cada producto de los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta )
# 
# Ejemplo:
#    _presupuesto = 2 (unidades) para el _tipoPedido = 2, cuyo _validaPresupuesto = true

#    producto 350 con _presentacion = 12 
#    producto 360 con _presentacion = 24 
#    Pedido registrado de Canje N1 para el cliente 2345: 
#           350 X unidades = 1, subunidades = 3 -> 1 unidad + 3/12 unidades = 1.25 unidades
#    Pedido registrado de Canje N2 para el cliente 5403: 
#           360 X unidades = 0, subunidades = 12  -> 0 unidades + 12/24 unidades = 0.50 unidades
#
#    presupuestoActual = _presupuesto - ( unidades consumidas) = 2 - (1.25+0.50) = 0.75
#    
# requiereMotivo del producto para el tipo de pedido que lo tenga configurado
# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2
# Cuando el tipo de operación tenga _esValorizado = true, se debe visualizar en los totales el valor monetario, unidad y subunidad.
# Cuando el tipo de operación tenga _esValorizado = false, se debe visualizar en los totales unidad y subunidad.

#Validación “cantidadMaximaUnidades”. Dato del cliente “cantidadMaximaUnidades” que indica la
#cantidad máxima de cajas que se pueden ingresar para un producto. (Opcional)
#Esta cantidad máxima aplicará a todos los tipos de operación donde se capturen productos..
#Si este dato no viene informado, se asume el valor como el entero más grande
#Si al ingresar las unidades se excede la cantidad máxima permitida,
#el sistema avisa: "La cantidad es mayor a X. Desea Continuar?"
#Si responde "Si", continua con la toma del pedido según botelleo habilitado o no.
#Si responde "No", se queda en el campo para que pueda corregir.
#
#Validación "unidadesDisponibles". Dato del producto en el portafolio del cliente (Opcional)
#Si este dato no viene informado, se asume el valor como el entero más grande
#Las unidades ingresadas no pueden ser mayores a las unidadesDisponibles del producto,
#informadas en el portafolio del cliente.

# Cuando para el cliente/producto está configurado el botelleo igual a esVentaSubunidades = true 
# Entonces el sistema habilita las subunidades en el ingreso del pedido
# Ejemplos:
# |_esVentaSubunidades| _habilitaSubunidades |permiteBotelleo
# |   true		      |     Condicional      |   SI
# |	  false		     | 	   Condicional	    |   NO
# |   true            |     Siempre          |   SI
# |   false          |     Siempre          |   SI  
# |	  -              | 	   Nunca	        |   NO  

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
	Y es menor o igual a las _unidadesDisponibles del producto para el cliente
	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo

Escenario: N°2 – La cantidad es menor o igual a la permitida y  menor a las unidades disponibles y las subunidades están habilitadas
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y permiteBotelleo = si
Entonces el sistema registrará las unidades y continuará con el ingreso de las subunidades

Escenario: N°3 – La cantidad es menor o igual a la permitida y  menor a las unidades disponibles y las subunidades están deshabilitadas y no se requiere motivo y el tipo de pedido del pedido en curso no valida presupuesto
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y permiteBotelleo = no
Y _requiereMotivo = false
Y tipo de pedido del pedido en curso tiene _validaPresupuesto = false
Entonces el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.

Escenario: N°4 – La cantidad es menor o igual a la permitida y  menor a las unidades disponibles y las subunidades están deshabilitadas y no se requiere motivo y el tipo de pedido del pedido en curso valida presupuesto
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y permiteBotelleo = no
Y _requiereMotivo = false
Y tipo de pedido del pedido en curso tiene _validaPresupuesto = true
Y presupuestoActual - cantidad de unidades ingresadas >= 0 
Entonces el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.

Escenario: N°5 – La cantidad no cumple con el presupuesto cuando el tipo de pedido del pedido en curso valida presupuesto.
Cuando se ingresa una cantidad
Y tipo de pedido del pedido en curso tiene _validaPresupuesto = true
Y presupuestoActual - cantidad de unidades ingresadas < 0 
Entonces el sistema mostrará el mensaje  "La cantidad ingresada excede el presupuesto asignado para el " & _descripción del _tipoPedido y permanecerá en el ingreso de la cantidad.

Escenario: N°6 – La cantidad es menor o igual a la permitida y las subunidades están deshabilitadas y requiere motivo y el tipo de pedido del pedido en curso valida presupuesto
Cuando se ingresa una cantidad
Y es menor o igual a la _cantidadMáximaUnidades
Y es menor o igual a _unidadesDisponibles del producto para el cliente
Y permiteBotelleo = no
Y _requiereMotivo = true
Y tipo de pedido del pedido en curso tiene _validaPresupuesto = true
Y presupuestoActual - cantidad de unidades ingresadas >= 0
Entonces el sistema registrará las unidades y continuará con el ingreso del motivo

#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

Escenario: N°7 – La cantidad es mayor a las unidades disponibles del producto para el cliente.
Cuando se ingresan unidades mayores a _unidadesDisponibles del producto para el cliente
Entonces el sistema mostrará el mensaje “La cantidad es mayor al disponible: 10” y permanece en el campo para que el prevendedor pueda corregir la cantidad

