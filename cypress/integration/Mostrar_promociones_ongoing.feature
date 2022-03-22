# language: es

@Pedido @PromocionesOngoing @Sprint21 @Sprint22

Característica: Mostrar promociones ongoing
Como prevendedor
Quiero visualizar las promociones ongoing automáticas y manuales según el pedido en curso
Para gestionarle al cliente las promociones

Antecedentes:
Dado que se seleccionó el control de promociones ongoing

Escenario: N°1 - Mostrar las promociones ongoing
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará la sección de condición de pago crédito con la lista de promociones que cumplen requisito a crédito
    Y mostrará la sección de condición de pago contado con la lista de promociones que cumplen requisito a contado
    Y mostrará la sección de promociones que no cubren el requisito
    Y mostrará el control para restabelcer promociones para cada sección de condición de pago

Escenario: N°2 - Calcular promociones y aplicar promociones automáticas cuando se modifica el pedido
    Dado que se modificaron productos que no son promo push en el pedido
    Y se reiniciaron las promociones para la condición de pago afectada
    Cuando se calculan las promociones para las condiciones de pago
    Y se aplican las promociones automáticas que cumplen con el requisito
    Entonces el sistema agrupará, por la condición de pago que corresponda, a las promociones automáticas aplicadas ordenadas por _promocionID
    Y las mostrará con el tag promoción automática, con el borde de tarjeta en verde y el icono verde
    Y agrupará las promociones que no cumplen con el requisito, ordenadas por _promocionID

#Se considera modificación:
# Cuando se cambia la condición de pago de un producto que 
# no tiene descuento automático ni tiene descuento escalonado 
# o tiene descuento automático y por configuración no se excluye 
# como requisito a los productos con desc. automático; 
# Se reinician las promociones para las dos condiciones de pago.
# 
# Cuando se agrega/modifica cantidad/borra un producto que 
# no tiene descuento automático ni tiene descuento escalonado 
# o tiene descuento automático y por configuración no se excluye 
# como requisito a los productos con desc. automático; 
# Solo se recalculan las promociones correspondientes a la condición de pago del producto. 
#
# Cuando a un producto con descuento escalonado 
# se le quita el descuento, manualmente o porque se modificó la cantidad 
# de unidades y ya no entra en ningún rango; 
# Este producto comenzaría a jugar como requisito entonces se 
# tienen que reiniciar las promociones de su condición de pago
#
# Cuando a un producto con descuento escalonado cuyas unidades no entraban 
# en ningún rango pero se modifica la cantidad y obtiene un descuento escalonado; 
# Este producto dejaría de jugar como requisito entonces se tienen 
# que reiniciar las promociones de su condición de pago

Escenario: N°3 - El pedido no se modifica
    Dado que se calcularon anteriormente las promociones
    Y no se modificaron productos que no son promo push en el pedido
    Cuando se muestra la pantalla de promociones
    Entonces el sistema mostrará en cada sección las promociones ya calculadas anteriormente

Escenario: N°4 - Mostrar promociones manuales en las secciones correspondientes
    Dado que se calcularon promociones manuales para el cliente que cumplen requisito
    Cuando se muestran las promociones manuales en las secciones correspondientes a la condición de pago
   Entonces el sistema mostrará luego de las promociones automáticas aplicadas el _promocionID, _descripcion de las promociones manuales
    Y el control para aplicar la promoción
    Y el control para editar la promoción
    Y mostrará las promociones ordenadas por _promocionID
    Y mostrará las promociones manuales aplicadas con el borde de tarjeta en verde y el icono verde y sin los controles aplicar y editar
    Y mostrará las promociones manuales que que cumplen requisito pero no se pueden aplicar, sin los controles aplicar y editar

Escenario: N°5 - Mostrar promociones que no cumplen requisito
    Dado que se calcularon promociones que no cumplen con el requisito
    Cuando se muestran las promociones que no cumplen requisito
    Entonces el sistema mostrará el _promocionID, _descripcion de las promociones que no cumplen requisito
    Y mostrará ordenado por _promocionID

#AM: Ver quien puso este escenario..?
#Para este caso, el usuario HS003 tiene en su portafolio los productos 440 y 360.
#A su vez, en promociones habilitadas tiene la promo 685233 y es aplicable una sola vez.
#Escenario: N°6 - Desaparecer promo que no fue aplicada
#Dado que ingrese los productos 360 con 5 unidades a credito
#Y ingrese el producto 440 con 5 unidades a contado
#Cuando selecciono el control de promocionesOnGoing
#Entonces deberia ver la promocion 685233 en contado y credito
#Y si le doy a aplicar a la promocion 685233 en contado, esta deberia aparecer un borde de color verde
#Y la promocion 685233 de credito deberia desaparecer.
