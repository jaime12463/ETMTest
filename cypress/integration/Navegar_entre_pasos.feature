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
    Y mostrará deshabilitados los pasos no visitados
    Y en color bordo
    Y habilitará el paso actual planeación en color bordo

Escenario: N°2 - Mostrar pasos visitados
    Dado que se avanzó entre los pasos
    Cuando se muestra la navegación de pasos
    Entonces el sistema mostrará los pasos visitados habilitados en color verde
    Y mostrará deshabilitados los pasos que no se visitaron
    Y mostrará el paso actual habilitado 
    Y en color bordó 

Escenario: N°3 - Navegar entre pasos
    Dado que se avanzó entre los pasos
    Cuando seleccino un paso que se encuentra en color verde
    Entonces el sistema mostrará la pantalla del paso seleccionado
    Y mantendrá con color verde los pasos ya visitados
    Y mostratrá habilitado el paso seleccionado
    Y en color bordó.

Escenario: N°4 - Cambios en el pedido
    Dado que se navegó desde un paso posterior a toma de pedido
    Y el paso actual es toma de pedido
    Y se hicieron cambios en toma de pedido
    Cuando se muestra la navegación
    Entonces el sistema deshabilitará los pasos siguientes al actual
    Y mantendrá habilitados en verde los pasos anteriores
    Y marcará el paso otros con un icono

# los cambios en toma de pedido son cambios en el pedido o cambios en promociones ongoing

Escenario: N°5 - Cambio en paso otros
    Dado que se navegó desde un paso posterior a paso otros
    Y el paso actual es otros
    Y se hicieron cambios en el paso otros
    Cuando se muestra la navegación
    Entonces el sistema deshabilitará los pasos siguientes al actual
    Y mantendrá habilitados en verde los pasos anteriores