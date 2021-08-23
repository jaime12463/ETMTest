# language: es

@Pedido @Agregar_producto @Sprint8 @Sprint10

#Sprint10: Se elimina parámetro esVentaSubunidadesRuta y se deja por producto el botelleo

#Cuando el usuario ingresa el código de producto, el sistema mostrará la descripción, precio unidades y precio subunidades.
#Si esventaSubunidades = false, el sistema no habilitará las subunidades

# Cuando para el cliente/producto está configurado el botelleo igual a esVentaSubunidades = true 
# Entonces el sistema habilita las subunidades en el ingreso del pedido
# Ejemplos:
# |esVentaSubunidades| habilitaSubunidades |permite botelleo
# |    true		     |     Habilitará      |   SI
# |    false		 |    No habilitará    |   NO



# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Ingreso de producto al pedido
    Como prevendedor 
    Quiero ingresar un producto al pedido 
    Para realizar la venta

Antecedentes:
Dado que el prevendedor se encuentra en el ingreso del pedido
Y el ingreso de productos se encuentra habilitado

Escenario: N°1 Producto inexistente
    Cuando ingresa un producto que no tiene precio vigente para la fecha de entrega calculada en el portafolio del cliente
    Entonces el sistema mostrará mensaje “El código no corresponde a un portafolio vigente del cliente” 

Escenario: N°2 El prevendedor ingresa un producto que aún no se encuentra en el pedido y tiene precio vigente para la fecha de entrega y no permite botelleo 
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Y tiene precio informado para la fecha de entrega calculada 
    Y que no tiene habilitado el botelleo
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas en cero
    Y no habilitará el ingreso de subunidades

Escenario: N°3 El prevendedor ingresa un producto que aún no se encuentra en el pedido y tiene precio vigente para la fecha de entrega y permite botelleo
    Cuando ingresa un producto del portafolio del cliente que no se encuentra en el pedido 
    Y tiene precio informado para la fecha de entrega calculada 
    Y permite botelleo
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas en cero.

Escenario: N°4 El prevendedor ingresa un producto que se encuentra en el pedido y no permite botelleo
    Cuando ingresa un producto que se encuentra en el pedido 
    Y no permite botelleo
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad 
    Y habilitará el ingreso de unidades inicializadas con lo registrado en el pedido 
    Y no habilitará el ingreso de subunidades. 

Escenario: N°5 El prevendedor ingresa un producto que se encuentra en el pedido y permite botelleo
    Cuando ingresa un producto que ya se encuentra en el pedido 
    Y permite botelleo 
    Entonces el sistema mostrará la descripción del producto
    Y el precio unidad
    Y precio subunidad 
    Y habilitará el ingreso de unidades y subunidades inicializadas con lo registrado en el pedido. 


