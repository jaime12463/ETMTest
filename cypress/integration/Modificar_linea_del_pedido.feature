# language: es

@Pedido @Modificar_producto @Sprint3 @Sprint8 @Sprint10

# Sprint10: se elimina el parámetro esVentaSubunidadesRuta y se deja por producto el botelleo
# Habilita el ingreso del motivo del producto para el tipo de pedido que tenga configurado requiereMotivo
# Si _requiereMotivo = true, se cargan del catalogoMotivos del json de configuración

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

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

Escenario: N°1 El prevendedor selecciona un producto que no permite botelleo y no requiere motivo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido 
	Y _esVentaSubunidades = false
    Y _requiereMotivo = false
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades inicializadas con lo registrado en el pedido 
	Y no habilitará el ingreso de subunidades
	Y no habilitará el ingreso del motivo.

Escenario: N°2 El prevendedor selecciona un producto que permite botelleo y no requiere motivo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido 
	Y _esVentaSubunidades = true
    Y _requiereMotivo = false
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido
	Y no habilitará el ingreso del motivo. 

Escenario: N°3 El prevendedor selecciona un producto que no permite botelleo y requiere motivo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido 
	Y _esVentaSubunidades = false
    Y _requiereMotivo = true
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades 
	Y no habilitará el ingreso de subunidades
	Y habilitará el ingreso del motivo cargado con las descripciones del catálogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.

Escenario: N°4 El prevendedor selecciona un producto que permite botelleo y requiere motivo
    Dado que el prevendedor se encuentra en el pedido 
    Cuando selecciona un producto de la lista del pedido 
	Y _esVentaSubunidades = false
    Y _requiereMotivo = true
    Entonces el sistema mostrará el código 
	Y la descripción del producto 
	Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido 
	Y habilitará el ingreso del motivo cargado con las descripciones del catálogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y con el motivo registrado como seleccionado.