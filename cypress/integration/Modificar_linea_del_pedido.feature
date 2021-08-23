# language: es

@Pedido @Modificar_producto @Sprint3 @Sprint8 @Sprint10

# Sprint10: se elimina el parámetro esVentaSubunidadesRuta y se deja por producto el botelleo

# Cuando para el cliente/producto está configurado el botelleo igual a esVentaSubunidades = true 
# Entonces el sistema habilita las subunidades en el ingreso del pedido
#Ejemplos:
#|esVentaSubunidades| habilitaSubunidades |permite botelleo
#|      true        |     Habilitará      |   SI
#|	    false	    |    No habilitará    |   NO


# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica: Modificar línea del pedido
	Como prevendedor
	Quiero modificar las unidades/subunidades de un producto del pedido
	Para cumplir con la cantidad requerida del cliente

Escenario: N°1 El prevendedor selecciona un producto que no permite botelleo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido y no permite botelleo
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades inicializadas con lo registrado en el pedido 
	Y no habilitará el ingreso de subunidades. 

Escenario: N°2 El prevendedor selecciona un producto que permite botelleo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido y permite botelleo
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades 
	Y de subunidades inicializadas con lo registrado en el pedido. 
