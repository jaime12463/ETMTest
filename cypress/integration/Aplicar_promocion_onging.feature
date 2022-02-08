# language: es

@Pedido @PromocionesOngoing @Sprint22

Característica: Aplicar promociones ongoing
    Como prevendedor
    Quiero aplicar las promociones ongoing
    Para otorgar los beneficios al cliente


Escenario: N°1 - Aplicar promociones ongoing con beneficio default
    Dado que tengo un listado de promociones ongoing manuales calculadas
    Cuando selecciono el control aplicar de una promoción
    Entonces el sistema marcará como aplicada la promoción
    Y otorgará el beneficio default calculado para la promoción seleccionada
    Y recalculará las promociones manuales para la condición de pago que corresponda
    Y mostrará la pantalla de promociones según mostrar promociones ongoing