# language: es

@Pedido @Agregar_producto @Validar_producto @Validar_múltiplo @Validar_presentacion @Validar_subunidad_maxima @Sprint8 @Sprint10

#Sprint10: se elimina el parámetro esVentaSubunidadesRuta y se deja por producto el botelleo
#se cambia habilitaSubunidades a condicional, siempre y nunca para el botelleo.
 
#Cuando el usuario ingresa el código de producto, el sistema mostrará la descripción, precio unidades y precio subunidades.
#Si esventaSubunidades = false, el sistema no habilitará las subunidades

# Cuando para el cliente/producto está configurado el botelleo igual a esVentaSubunidades = true 
# Entonces el sistema habilita las subunidades en el ingreso del pedido
# Ejemplos:
# |_esVentaSubunidades| _habilitaSubunidades |permiteBotelleo
# |   true		     |     Condicional      |   SI
# |	  false			 | 	   Condicial	    |   NO
# |   true           |     Siempre          |   SI
# |   false          |     Siempre          |   SI  
# |	  -              | 	   Nunca	        |   NO  




# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Ingresar producto al pedido desde el portafolio
    Como prevendedor 
    Quiero poder seleccionar un producto del portafolio del cliente e informar la cantidad de unidades
    Para poder agregarlo al pedido
    Y ver actualizados los totales del pedido 

Escenario: N°1 El prevendedor selecciona un producto que aún no se encuentra en el pedido y no permite botelleo
    Dado que el prevendedor se encuentra en el portafolio del cliente 
    Cuando selecciona un producto del portafolio del cliente que no se encuentra en el pedido y permiteBotelleo = no
    Entonces el sistema mostrará el código 
    Y la descripción del producto 
    Y habilitará el ingreso de unidades inicializadas en cero 
    Y no habilitará el ingreso de subunidades. 

Escenario: N°2 El prevendedor selecciona un producto que aún no se encuentra en el pedido y permite botelleo
    Dado que el prevendedor se encuentra en el portafolio del cliente 
    Cuando selecciona un producto del portafolio del cliente que no se encuentra en el pedido y permiteBotelleo = si
    Entonces el sistema mostrará el código y la descripción del producto y habilitará el ingreso de unidades y de subunidades inicializadas en cero. 

Escenario: N°3 El prevendedor selecciona un producto que se encuentra en el pedido y no permite botelleo
    Dado que el prevendedor se encuentra en el portafolio del cliente 
    Cuando selecciona un producto del portafolio del cliente que se encuentra en el pedido y permiteBotelleo = no
    Entonces el sistema mostrará el código y la descripción del producto y habilitará el ingreso de unidades inicializadas con lo registrado en el pedido y no habilitará el ingreso de subunidades. 

Escenario: N°4 El prevendedor selecciona un producto que se encuentra en el pedido y permite botelleo
    Dado que el prevendedor se encuentra en el portafolio del cliente 
    Cuando selecciona un producto del portafolio del cliente que se encuentra en el pedido y permiteBotelleo = si
    Entonces el sistema mostrará el código y la descripción del producto y habilitará el ingreso de unidades y de subunidades inicializadas con lo registrado en el pedido. 

