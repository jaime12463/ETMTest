# language: es

@Visita @Totales @ResumenVisita @Sprint12

# sprint 12 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542

Característica: Mostrar total del pedido de la visita
    Como prevendedor con visita al cliente en curso
    Quiero ver el total y el resumen de la visita
    Para informarle al cliente

Antecedentes:
    Dado que se ingresó un cliente al sistema

Escenario: N°1 - Mostrar total de la visita
    Cuando estoy dentro de la visita del cliente
    Entonces el sistema mostrará en la descripción del cliente
    Y el total acumulado de la visita resultante del calculo total del pedido de la visita.

# Para el calculo total del pedido de la visita ver Calcular_total_del_pedido_visita

Escenario: N°2 - Mostrar indicadores de la visita
    Cuando se despliega el resumen de la visita
    Entonces el sistema mostrará la fecha de entrega del pedido
    Y los indicadores de crédito disponible, pedido mínimo y pedido máximo

