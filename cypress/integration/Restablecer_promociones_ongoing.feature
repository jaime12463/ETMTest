# language: es

@Pedido @PromocionesOngoing @Sprint22 @Sprint23

Característica: Restabelecer promociones ongoing
    Como prevendedor
    Quiero restablecer las promociones ongoing
    Para volver a gestionar las promociones al cliente

Esquema del escenario: N°1 - Restablecer promociones de condición de pago
    Dado que se aplicaron promociones manuales
    Cuando selecciono el control restablecer promociones en '<condicionDePago>'
    Entonces el sistema avisará que se restablecerán las promociones manuales aplicadas en '<condicionDePago>'
    Y si acepta, el sistema borrará los beneficios otorgados de las promociones manuales
    Y restablecerá los descuentos de los productos del pedido afectados por las promociónes manuales
    Y recalculará las promociones manuales para la condición de pago '<condicionDePago>'
    Y actualizará la pantalla de promociones ongoing según mostrar promociones ongoing
    Y recalculará los envases para retorno según calcular envases retornables
    Y restablecerá el disponible de las promociónes

Ejemplos:
|condicionDePago|
|    contado    |
|    crédito    |

# Caso descuento escalonado. Si el usuario quitó el descuento, al restablecer descuentos éste no se restablece.