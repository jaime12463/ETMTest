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
    Y no dejará continuar