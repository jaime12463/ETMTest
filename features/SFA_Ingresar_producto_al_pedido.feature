@Ingresar_producto_al_pedido @Sprint1
Característica: Ingresar producto al pedido
    Como prevendedor 
    Quiero poder seleccionar un material del portafolio del cliente e informar la cantidad de unidades
    Para poder agregarlo al pedido
    Y ver actualizados los totales del pedido 

@Test_dispositivo_1
Escenario: N°1 El prevendedor selecciona un producto que aún no se encuentra en el pedido
    Dado que el prevendedor ha tecleado un cliente 
    Cuando selecciona un producto del portafolio del cliente que no se encuentra en el pedido
    Entonces el sistema habilita el ingreso del producto mostrando código de producto y cantidad de unidades en cero 

@Test_dispositivo_2
Escenario: N°2 El prevendedor selecciona un producto que incorporó previamente al pedido
    Dado que el prevendedor ha tecleado un cliente 
    Cuando selecciona un producto del portafolio del cliente que se encuentra en el pedido
    Entonces el sistema habilita el ingreso del producto mostrando código de producto y cantidad de unidades inicializadas con las que se indican en el pedido 