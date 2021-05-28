@Sprint1
@Ver portafolio del cliente

Característica: Ver portafolio del cliente
Como prevendedor 
Quiero teclear un código de cliente
Para ver sus productos portafolio 
Y poder registrarle un pedido
	
Escenario: N°1 El cliente tiene productos portafolio informados
Dado que hay productos con precio informado para el cliente 105404345
Cuando el prevendedor teclea el código de cliente 105404345
Entonces el sistema muestra el código y precio final por unidad de los productos informados para el cliente con código 105404345 

Escenario: N°2 El cliente no tiene portafolio informado
Dado que no hay productos con precio informado para el cliente
Cuando el prevendedor teclea el código del cliente
Entonces el sistema muestra el mensaje: “El cliente no tiene portafolio informado”


@Buscar producto del portafolio del cliente

Característica:Buscar producto del portafolio del cliente
Como prevendedor
Quiero buscar, por código, un producto dentro del portafolio del cliente
Para agregarlo al pedido

Escenario: N°1 El producto pertenece al portafolio del cliente y no está en el pedido
Dado que el prevendedor ha tecleado un cliente 
Cuando ingresa el código de un producto que pertenece al portafolio del cliente 
Entonces el sistema lo muestra en la lista 

Escenario: N°2 El producto no pertenece a un producto del portafolio del cliente
Dado que el prevendedor ha tecleado un cliente 
Cuando ingresa un código que no corresponde a un producto del portafolio del cliente 
Entonces el sistema muestra el mensaje “El código no corresponde a un producto del portafolio del cliente”

@Ingresar producto al pedido

Característica: Ingresar producto al pedido
Como prevendedor 
quiero poder seleccionar un material del portafolio del cliente
e informar la cantidad de unidades
para poder agregarlo al pedido
y ver actualizados los totales del pedido 

Escenario: N°1 El prevendedor selecciona un producto que aún no se encuentra en el pedido
Dado que el prevendedor ha tecleado un cliente 
Cuando selecciona un producto del portafolio del cliente que no se encuentra en el pedido
Entonces el sistema habilita el ingreso del producto mostrando código de producto y cantidad de unidades en cero 

Escenario: N°2 El prevendedor selecciona un producto que incorporó previamente al pedido
Dado que el prevendedor ha tecleado un cliente 
Cuando selecciona un producto del portafolio del cliente que se encuentra en el pedido
Entonces el sistema habilita el ingreso del producto mostrando código de producto y cantidad de unidades inicializadas con las que se indican en el pedido 


@Ver detalle del pedido
Característica: Ver detalle del pedido
Como prevendedor 
Quiero poder ver el código de producto y cantidad de unidades de los productos ingresados en el pedido 
Para saber qué compró el cliente hasta ahora.


@Ver totales del pedido
Como prevendedor
Quiero ver el total de unidades y monto del pedido 
Para informarle al cliente cuánto lleva gastado en el total de cajas compradas



@Sprint2
@Búsqueda de materiales

Característica: Búsqueda de materiales por atributos
Como Prevendedor
Quiero realizar la búsqueda de un material por atributos
Para agregarlo al pedido

Escenario: N°1 Búsqueda de material por atributo Descripción
Dado que el prevendedor ingresa caracteres
Cuando haya ingresado al menos dos o más
Entonces la lista se reduce a los materiales que contienen
lo ingresado por el prevendedor

Escenario: N°2 No mostrar SKUs que no estén incluídos en el portafolio
Dado que el prevendedor tiene portafolio asignado
Cuando se realiza la búsqueda de material
se muestran solamente los materiales que cumplan con la condición
de búsqueda ingresada
y que pertenezcan al portafolio del cliente


@Descripción de cliente

Característica: Ver la razón social del cliente
Como prevendedor
Quiero ver la razón social del cliente


@Descripción de productos

Característica: Ver descripción de productos en pedido y detalle
Como prevendedor
Quiero ver la descripción de los productos en el ingreso de productos
y en el detalle del pedido.


@Fecha de entrega

Característica: cálculo de fecha de entrega (construcción)
Como prevendedor
Quiero saber la fecha de entrega del pedido
Para dar visibilidad de cuando el cliente recibirá los productos.

Antecedentes:
Dado que la fecha de entrega viene calculada

Escenario: N°1 Mostrar la fecha de entrega
Cuando el prevendedor ingresa un cliente
Entonces el sistema muestra la fecha de entrega

Escenario: N°2 Mostrar precios y productos vigentes según la fecha de entrega
Cuando el prevendedor ingresa un cliente
Entonces el sistema muestra los productos 
y sus precios que estén vigentes según la fecha de entrega.