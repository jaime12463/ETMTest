@Pedido @Ver_portafolio @Sprint1
Característica: Ver portafolio del cliente
    Como prevendedor 
    Quiero teclear un código de cliente
    Para ver sus productos portafolio 
    Y poder registrarle un pedido

@Test_dispositivo_1	
Escenario: N°1 El cliente tiene productos portafolio informados
    Dado que hay productos con precio informado para el cliente 105404345
    Cuando el prevendedor teclea el código de cliente 105404345
    Entonces el sistema muestra el código y precio final por unidad de los productos informados para el cliente con código 105404345 

@Test_dispositivo_2
Escenario: N°2 El cliente no tiene portafolio informado
    Dado que no hay productos con precio informado para el cliente
    Cuando el prevendedor teclea el código del cliente
    Entonces el sistema muestra el mensaje: “El cliente no tiene portafolio informado”