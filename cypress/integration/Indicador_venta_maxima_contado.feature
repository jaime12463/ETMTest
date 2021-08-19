# language: es

@Pedido @Inidicador_maximo @Sprint8 @Sprint9

Característica: Indicador venta máximo contado
    Como prevendedor cuando estoy en la pantalla de ingreso del pedido
    Quiero ver el avance del consumido de contado
    Para saber si le puedo registrar un pedido de contado o compromiso de cobro

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Esquema del escenario: N°1 - Ver avance de la venta de contado
    Dado que el cliente tiene <montoVentaContadoMaxima> definido (menor al entero más grande)
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema mostrará el total del indicador igual a <montoVentaContadoMaxima> 
    Y el <avance> según <montoContado> igual a venta máxima consumida para la fecha de entrega más la suma de los montos de los pedidos de contado registrados para la misma fecha de entrega más monto de los productos de contado del pedido en curso + compromisos de cobro registrados para la misma fecha de entrega + compromiso de cobro en curso

|montoContado|montoVentaContadoMaxima|avance|   
|     0      |       100             |  0%  |
|     10     |       100             |  10% |
|     100    |       100             |  100%|
|     101    |       100             |  100%|

# Texto de avance: 0/100, 10/100, 100/100, 101/100
# Color:           verde, verde , verde  , rojo 
    

Escenario: N°2 - Ocultar indicador de venta máxima de contado
    Dado que el cliente no tiene monto de venta contado maxima definido (igual al entero más grande)
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema no mostrará el indicador de venta máxima
