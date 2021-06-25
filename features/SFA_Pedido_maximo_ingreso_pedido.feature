@Pedido @Validar_Ingreso_pedido @Validar_pedido_maximo @Sprint5

# Si el cliente ya consumió la venta máxima para la fecha de entrega 
# actual el sistema propone # para tomar el pedido la próxima 
# fecha de entrega con venta disponible

Característica: validación pedido máximo al ingreso del pedido
    Como prevendedor
    Quiero saber si el cliente ya cumplió con el pedido máximo para la fecha de entrega calculada
    Para poder ingresarle otros pedidos.


Esquema del escenario: N°1 - El cliente no consumió el monto máximo de pedido para la fecha de entrega calculada
    Dado que se ingresó el cliente
    Cuando la suma de los montos de los pedidos para la fecha de entrega calculada es menor a <montoVentaMaxima> 
    Entonces el sistema permitirá ingresar el pedido

Ejemplos:
|montoVentaMaxima|
|    1000        | 

Esquema del escenario: N°2 - El cliente consumió el monto máximo de pedido para la fecha de entrega calculada y tiene otra fecha de entrega con venta disponible
    Dado que se ingresó el cliente
    Cuando la suma de los montos de los pedidos para la fecha de entrega calculada es igual al <montoVentaMaxima> 
    Entonces el sistema propondrá ingresar un pedido para la próxima fecha de entrega cuyo monto consumido sea menor al <montoVentaMaxima> 
    Y establecerá dicha fecha de entrega para el pedido actual

Ejemplos:
|montoVentaMaxima|
|    1000        |

Esquema del escenario: N°3 - El cliente consumió el monto máximo de pedido para la fecha de entrega calculada y no tiene otra fecha de entrega con venta disponible
    Dado que se ingresó el cliente
    Cuando la suma de los montos de los pedidos para la fecha de entrega calculada es igual al <montoVentaMaxima> 
    Y no existe una fecha de entrega con venta disponible
    Entonces el sistema informará que no hay fecha de entrega disponible para registrar un pedido 
    Y no permitirá ingresar un pedido

Ejemplos:
|montoVentaMaxima|
|    1000        |