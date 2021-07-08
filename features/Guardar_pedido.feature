@Pedido @Guardar_pedido @Sprint4

# Agregar botón para guardar el pedido. Los pedidos deben registrarse con un id.
# Registrar en cabecera: número de pedido, código de cliente, fecha de entrega, 
# fecha y hora de registro, tipo de operación, total unidades, total subunidades, 
# monto total del pedido.
# Registrar detalle: código de producto, unidades, subunidades, 
# precio unitario de unidad, precio unitario de subunidad, 
# monto subtotal de la línea de producto 


# UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

Característica: guardar pedido
    Como prevendedor
    Quiero guardar el pedido realizado
    Para luego informar a central la venta realizada

Escenario: N°1 – guardar pedido
    Dado que se ingresaron los productos
    Cuando selecciono guardar pedido
    Entonces el sistema registrará el pedido al cliente
    Y volverá al ingreso de cliente


