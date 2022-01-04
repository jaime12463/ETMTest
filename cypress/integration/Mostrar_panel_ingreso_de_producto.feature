# language: es
@Pedido @Ingreso_de_producto @Sprint10

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

Característica: Controles en panel de ingreso de producto 
    Como prevendedor
    Quiero ver el panel de ingreso de producto con los campos necesarios según el tipo del pedido
    Para registrar el producto de forma correcta


Escenario: N°1 - El tipo de pedido requiere motivo
    Dado que se ingresó a un pedido cuyo tipo de pedido _requiereMotivo = true
    Cuando se encuentra habilitado el ingreso del producto
    Entonces el sistema mostrará el producto, descripción, los atributos del producto, unidad, subunidad y el combo de selección de motivos vacíos.

Escenario: N°2 - El tipo de pedido no requiere motivo
    Dado que se ingresó a un pedido cuyo tipo de pedido _requiereMotivo = false
    Cuando se encuentra habilitado el ingreso del producto
    Entonces el sistema mostrará el producto, descripción, los atributos del producto, unidad, subunidad, el precio unidad y el precio subunidad vacíos.

# los atributos a mostrar del producto son: tamaño y envase 