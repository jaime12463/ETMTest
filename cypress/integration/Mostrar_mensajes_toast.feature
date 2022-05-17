# language: es

@Pedido @Mensajes @Sprint29


Característica: Mostrar mensajes en formato toast
    Como prevendedor
    Quiero visualizar los mensajes de error y warning como notificaciones
    Para conocer el estado de las actividades

Escenario: N°1 - Mostrar toast de eventos
    Dado que se realizó una acción en la aplicación
    Y se debe dar un mensaje
    Cuando se muestra un mensaje toast
    Entonces el sistema mostrará el mensaje con una duración de _tiempoToastEnSegundos segundos