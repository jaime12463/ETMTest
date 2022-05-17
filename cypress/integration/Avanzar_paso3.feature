# language: es

@Otros @Paso3 @Sprint20 @Sprint21


Característica: Mostrar avance de visita
    Como prevendedor que se encuentra en visita al cliente, al avanzar al paso 4 del pedido
    Quiero que el sistema me indique si no cumplo con los indicadores
    Para corregir el pedido

Escenario: N°1 - Pedido mínimo no alcanzado teniendo un tipo de pedido que contribuye al mínimo
    Dado que estoy en paso otros
    Y existe un _tipoPedido cargado que _contribuyeAMinimo = true 
    Y el pedido mínimo no está cumplido
    Cuando avanzo al paso 4 finalizar pedido
    Entonces el sistema mostrará un mensaje de error indicando que el pedido no alcanza el pedido mínimo
    Y permanece en el paso Otros

# pedido mínimo cumplido, ya sea por ingresar productos y cumplir con el mínimo o por venir configurado como cumplido = true

Esquema del escenario: N°2 - No hay un tipo de pedido que contribuye a mínimo y existe compromiso de cobro cargadado o bonificaciones
    Dado que estoy en paso otros
    Y no exsite un _tipoPedido cargado que _contribuyeAMinimo = true
    Y tiene _bonificacionesConVenta = false
    Y '<hayCompromisoCobro>' compromiso de cobro
    Y '<hayBonificacion>' bonificaciones
    Cuando avanzo al paso 4 finalizar pedido
    Entonces el sistema avanzará al paso 4 finalizar pedido

Ejemplos:
|hayCompromisoCobro | hayBonificacion|
|    No registra    |   No registra  |
|    No registra    |   Si registra  |
|    Si registra    |   No registra  |
|    Si registra    |   Si registra  |


Escenario: N°3 - Hay bonificiaciones cargadas que superan el disponible permitido
    Dado que estoy en paso otros
    Y existen bonificiaciones con error en las cantidades
    Cuando avanzo al paso 4 finalizar pedido
    Entonces el sistema mostrará el mensaje de error de cantidades en bonificaciones