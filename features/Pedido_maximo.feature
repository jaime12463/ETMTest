@Pedido @Validar_cierre_pedido @Validar_pedido_maximo @Sprint4

# La suma de los totales de los pedidos realizados no puede superar a X monto. 
# Aplica a operaciones de venta contado.

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: validar pedido máximo
    Como prevendedor
    Quiero que al guardar un pedido el sistema verifique que no me exceda al monto máximo del cliente 
    Para evitar tener mucho dinero durante el recorrido

Antecedentes:
    Dado que se estableció $<montoVentaMaxima> como monto máximo del cliente
    Y la suma total de pedidos realizados para <fechaDeEntrega> es $<montoTotal>

Esquema del escenario: N°1 – Cumple con monto máximo
    Cuando guardo un pedido con <fechaEntregaPedido> cuyo monto es de $<montoPedido>
    Entonces el sistema <acción>
        
Ejemplos:
|montoVentaMaxima|fechaDeEntrega|montoTotal|fechaEntregaPedido|montoPedido|accion                              |
|   1000         |  25/06/2021  |  600     |  25/06/2021      | 399       |guardará el pedido                  |
|   1000         |  25/06/2021  |  600     |  25/06/2021      | 400       |guardará el pedido                  | 
|   1000         |  25/06/2021  |  600     |  25/06/2021      | 401       |Avisará y permanecerá en el pedido  | 

# Mensaje: La suma de los pedidos para la fecha de entrega <fechaDeEntrega> 
# excede el monto máximo para el cliente $ <montoVentaMaxima>