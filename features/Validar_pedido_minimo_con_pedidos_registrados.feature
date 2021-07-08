@Pedido @Validar_cierre_pedido @Validar_pedido_minimo @Sprint4

# Si el cliente no posee al menos un pedido para la misma fecha de entrega, 
# el sistema realiza la validación del pedido mínimo del sprint 3 
# (ver historia de usuario sprint 3 “validar pedido mínimo”).
# Caso contrario, guarda el pedido

# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: validar pedido mínimo con pedidos registrados
    Como prevendedor
    Quiero asegurarme que el primer pedido del cliente para una fecha de entrega cumpla con el monto mínimo
    Para realizar otros pedidos de cualquier monto

# Asegurarse que sea el primer pedido para la fecha de entrega, no necesariamente tiene que 
# ser el único (pensado en edición)

Escenario: N°1 – Primer pedido del cliente para una fecha de entrega
    Dado que se ingresó un cliente y el pedido actual es el primer pedido registrado para la fecha de entrega
    Cuando guardo el pedido
    Entonces el sistema validará si el pedido cumple con el monto mínimo de pedido

Escenario: N°2 – Otros pedidos del cliente para una fecha de entrega
    Dado que se ingresó un cliente y el pedido actual no es el primero registrado para la misma fecha de entrega
    Cuando guardo el pedido
    Entonces el sistema guardará el pedido sin validar. 
