# language: es

@Pedido  @Sprint10


# Ingreso del motivo para cuando el tipo de pedido lo requiera segun configuracion requiereMotivo
# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

# Cuando el tipo de operación tenga _esValorizado = true, se debe visualizar en los totales el valor monetario, unidad y subunidad.
# Cuando el tipo de operación tenga _esValorizado = false, se debe visualizar en los totales unidad y subunidad.


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

