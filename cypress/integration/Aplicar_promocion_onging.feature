# language: es

@Pedido @PromocionesOngoing @Sprint22 @Sprint23

Característica: Aplicar promociones ongoing
    Como prevendedor
    Quiero aplicar las promociones ongoing
    Para otorgar los beneficios al cliente


Escenario: N°1 - Aplicar promociones ongoing con beneficio default
    Dado que tengo un listado de promociones ongoing manuales calculadas
    Cuando selecciono el control aplicar de una promoción
    Entonces el sistema marcará como aplicada la promoción
    Y otorgará todos los beneficios default calculados para la promoción seleccionada
    Y recalculará las promociones manuales para la condición de pago que corresponda
    Y recalculará los envases para retorno según calcular envases retornables
    Y mostrará la pantalla de promociones según mostrar promociones ongoing
    Y marcará en verde la promoción
    Y actualizará el disponible de la promoción

    #el calculo de promociones ya marca las promociones manuales que cumplen requisito pero 
    # no se pueden aplicar por haber otorgado otra promocion.

Escenario: N°2 - Aplicar promociones ongoing con edicion de beneficio
    Dado que se ingresó a editar una promoción
    Cuando selecciono el control aplicar beneficio de una promoción
    Entonces el sistema marcará como aplicada la promoción
    Y otorgará todos los beneficios ingresados de las secuencias de la promoción seleccionada, para el grupo seleccionado
    Y recalculará las promociones manuales para la condición de pago que corresponda
	Y recalculará los envases para retorno según el calculo de envases
    Y marcará en verde la promoción
    Y actualizará el disponible de la promoción
    Y ocultará la promoción
    Y mostrará la pantalla de promociones según mostrar promociones ongoing

# Los descuentos en monto y %, se aplican sobre precioSinImpuestoUnidad y precioSinImpuestoSubunidad
# cuando es en monto, el precio corresponde a unidades.
# Si el producto tiene descuento polarizaro, la promo ongoing aplica sobre el precio calculado con descuento polarizado.