# language: es

@Pedido  @Sprint10


# Ingreso del motivo para cuando el tipo de pedido lo requiera segun configuracion requiereMotivo




Característica: Ingresar motivo del producto al pedido
	Como prevendedor
	Quiero ingresar un motivo del producto al pedido 
	Para realizar la venta.
	
Escenario: N°1 – Ingreso del motivo 
    Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
    Y se requiere el ingreso de un motivo
    Cuando se selecciona el motivo
    Entonces el sistema registrará el motivo y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.
 
#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

