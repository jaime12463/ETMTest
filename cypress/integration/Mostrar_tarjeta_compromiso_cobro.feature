# language: es

@Pedido @Sprint14

# Si el cliente es de contado no se muestra la tarjeta de compromiso de cobro.
# Caso contrario se muestra habilitada

Característica: Mostrar tarjeta de compromiso de cobro
    Como prevendedor
    Quiero ver la tarjeta de compromiso de cobro en aquellos clientes que no son de contado
    Para gestionarle el credito disponible al cliente

Escenario: N°1 - Tarjeta habilitada
    Dado que se ingresó un cliente que tiene condicion de pago <> contado
    Cuando estoy en el paso 3 - otros
    Entonces el sistema muestrará la tarjeta de compromiso de cobro en pantalla

Escenario: N°2 - No se muestra la tarjeta de compromiso
    Dado que se ingresó un cliente que tiene condicion de pago = contado
    Cuando estoy en el paso 3 - otros
    Entonces el sistema no mostrará la tarjeta de compromiso de cobro en pantalla