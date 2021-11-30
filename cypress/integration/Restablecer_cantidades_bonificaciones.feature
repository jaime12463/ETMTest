# language: es

@Pedido @Bonificacion @Sprint17

# _disponible_ = es _cantidadBeneficioGrupo - cantidades ingresadas de todos los productos del mismo grupo

Característica: Restablecer las bonificaciones
    Como prevedendor
    Quiero volver al estado inicial todas las bonificaciones
    Para quitarlas del pedido al cliente


Escenario: N°1 - Restablecer cantidades
    Dado que se ingresaron productos de bonificación
    Y se muestró el control para reestablecer cantidades
    Cuando selecciono reestablecer las cantidades
    Entonces el sistema avisará que se borrarán las bonificaciones ingresadas
    Y preguntará si desea contiunar
    Y si continúa, eliminará las cantidades ingresadas dejandolas en 0
    Y actualizará el _disponible_