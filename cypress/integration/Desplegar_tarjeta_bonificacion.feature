# language: es

@Pedido @Bonificacion @Paso3 @Sprint17

Característica: Desplegar tarjeta de bonificacion
	Como prevendedor
	Quiero desplegar la tarjeta bonificacion
	Para ver y otorgar bonificaciones al cliente

Escenario: N°1 - Desplegar tarjeta bonificaciones
	Dado que el cliente tiene bonificaciones habilitadas
	Y están vigentes a la fecha del dispositivo
	Y tiene al menos una bonificacion con _bonificacionDisponible > 0
	Y tiene en un grupo al menos un producto en portafolio vigente del cliente
	Cuando selecciono el control desplegar
	Entonces el sistema desplegará la tarjeta de bonificiaciones 
	Y mostrará el _nombreBonificacion_ ordenadas por _idBonificacion_
	Y el control para ver detalle de la bonificación de aquellas que tienen _bonificacionDisponible > 0
	Y no mostrará las bonificaciones que tengan _bonificacionDisponible = 0