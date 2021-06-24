@Pedido @Validar_cierre_pedido @Validar_pedido_maximo @sprint4

# La suma de los totales de los pedidos realizados no puede superar a X monto. 
# Aplica a operaciones de venta contado.

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: validar pedido máximo
    Como prevendedor
    Quiero que al guardar un pedido de contado el sistema verifique que no me exceda al monto máximo de la ruta
    Para evitar tener mucho dinero durante el recorrido

Antecedentes:
    Dado que se estableció $<montoMaximoContado> como monto máximo de ruta para contado
    Y la suma total de pedidos realizados de contado es $<montoTotalContado>

Esquema del escenario: N°1 – Cumple con monto máximo
    Cuando guardo un pedido de contado cuyo monto es de $<montoPedidoContado>
    Entonces el sistema <acción>

Ejemplos:
|montoMaximoContado|montoTotalContado|montoPedidoContado|accion                              |
|    1000          |    900          |    99            | guardará el pedido                 | 
|    1000          |    900          |    10            | guardará el pedido                 |
|    1000          |    900          |    101           | Avisará y permanecerá en el pedido |
