@Aviso_en_ingreso_de_unidades_maximas_de_material @Sprint3

# Si hay definida una cantidad máxima de unidades para el cliente 
# y al ingresar las unidades excede dicha cantidad máxima, 
# el sistema avisa:” La cantidad es mayor a X. Desea Continuar?”  
# Si responde “Si”, continua con la toma del pedido. 
# Si responde “No”, se queda en el campo para que pueda corregir. 
#
# Nuevo dato del cliente “cantidadMaximaUnidades” que indica la 
# cantidad máxima de cajas que se pueden ingresar para un producto. (Opcional)
# Esta cantidad máxima aplicará a todos los tipos de operación 
# donde se capturen materiales.

Característica: Aviso en ingreso de unidades maximas de material
	Como prevendedor
	Quiero que al ingresar una cantidad mayor a 100 en las unidades el sistema me avise
	Para corregir los datos si fuera necesario.
 
Antecedentes:
	Dado que la cantidad máxima de unidades se estableció en 100 para el cliente

@Test_dispositivo_1
Esquema del escenario N°1 – La cantidad es mayor a la permitida
	Cuando se ingresa <cantidad>
	Entonces el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” (Si/No)

Ejemplo:
|cantidad|
|   101  |
|   110  |

@Test_dispositivo_2
Esquema del escenario N°2 – La cantidad es menor o igual a la permitida
	Cuando se ingresa <cantidad>
	Entonces el sistema continuará con el ingreso del pedido.

Ejemplo:
|cantidad|
|   99   |
|   100  |

@Test_dispositivo_3
Escenario N°3: Las unidadesMaximasVenta no está definido para el cliente
	Dado que el cliente no tiene configurado las unidadesMaximasVenta
	Cuando se ingresan las unidades del pedido del cliente
	Entonces el sistema no realizará validación de unidades ingresadas