# language: es

@Pedido @Navegar_pasos @Sprint28

Característica: Navegar entre pasos
    Como prevendedor
    Quiero ver los pasos del proceso de la toma de pedido y poder navegarlos 
    Para realizar una visita completa


Escenario: N°1 - Mostrar pasos de toma de pedido 
    Dado que se ingresó un cliente
    Cuando se muestra la pantalla de planeación
    Entonces el sistema mostrará los pasos de toma de pedido
    Y mostrará deshabilitados los pasos
    Y habilitará el paso planeación en color verde

Escenario: N°2 - Mostrar pasos avanzados
    Dado que se avanzó entre pasos
    Cuando se muestra la navegación de pasos
    Entonces el sistema mostrará los pasos por los cuales ya se pasó habilitados en color verde
    Y mostrará deshabilitados los pasos siguientes al paso actual

Escenario: N°3 - Navegar entre pasos
    Dado que se avanzó entre pasos
    Y se habilitaron pasos anteriores
    Cuando seleccino un paso anterior al paso donde me encuentro
    Entonces el sistema mostrará el paso seleccionado en color verde
    Y mostrará los pasos anteriores al seleccionado habilitados en color verde
    Y deshabilitará los pasos siguientes al paso actual seleccionado