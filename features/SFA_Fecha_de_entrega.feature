@Pedido @Validar_ingreso_pedido @Calcular_fecha_de_entrega @Sprint2
Característica: cálculo de fecha de entrega (construcción)
    Como prevendedor
    Quiero saber la fecha de entrega del pedido
    Para dar visibilidad de cuando el cliente recibirá los productos.

Antecedentes:
    Dado que la fecha de entrega viene calculada

@Test_dispositivo_1
Escenario: N°1 Mostrar la fecha de entrega
    Cuando el prevendedor ingresa un cliente
    Entonces el sistema muestra la fecha de entrega

@Test_dispositivo_2
Escenario: N°2 Mostrar precios y productos vigentes según la fecha de entrega
    Cuando el prevendedor ingresa un cliente
    Entonces el sistema muestra los productos y sus precios que estén vigentes según la fecha de entrega.