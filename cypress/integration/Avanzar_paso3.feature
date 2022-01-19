# language: es

@Otros @Paso3 @Sprint20


Característica: Mostrar avance de visita
    Como prevendedor que se encuentra en visita al cliente, al avanzar al paso 4 del pedido
    Quiero que el sistema me indique si no cumplo con los indicadores
    Para corregir el pedido

Escenario: N°1 - Limite de crédito excedido
    Dado que estoy en paso Otros en un cliente con pedido a crédito
    Y excedí el límite de crédito
    Cuando avanazo al paso 4 finalizar pedido
    Entonces el sistema mostrará un mensaje que estoy excediendo el límite de crédito
    Y permanece en el paso Otros

Escenario: N°2 - Pedido mínimo no alcanzado
    Dado que estoy en paso otros
    Y el pedido mínimo no está alcanzado
    Cuando avanzo al paso 4 finalizar pedido
    Entonces el sistema mostrará un mensaje de error indicando que el pedido no alcanza el pedido mínimo
    Y permanece en el paso Otros