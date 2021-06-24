@Pedido @Buscar_productos @Sprint1

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

Característica:Buscar producto del portafolio del cliente
    Como prevendedor
    Quiero buscar, por código, un producto dentro del portafolio del cliente
    Para agregarlo al pedido

@Test_dispositivo_1
Escenario: N°1 El producto pertenece al portafolio del cliente y no está en el pedido
    Dado que el prevendedor ha tecleado un cliente 
    Cuando ingresa el código de un producto que pertenece al portafolio del cliente 
    Entonces el sistema lo muestra en la lista 

@Test_dispositivo_2
Escenario: N°2 El producto no pertenece a un producto del portafolio del cliente
    Dado que el prevendedor ha tecleado un cliente 
    Cuando ingresa un código que no corresponde a un producto del portafolio del cliente 
    Entonces el sistema muestra el mensaje “El código no corresponde a un producto del portafolio del cliente”
