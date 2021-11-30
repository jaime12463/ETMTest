# language: es

@Pedido @Bonificacion @Paso3 @Sprint17

Característica: Desplegar grupo de bonificaciones
	Como prevendedor
	Quiero ver el detalle de las bonificaciones
	Para otorgar bonificaciones al cliente

Escenario: N°1 - Desplegar detalle de bonificacion
	Dado que se desplegó la tarjeta de bonificacion
	Cuando selecciono el control desplegar el detalle
	Entonces el sistema mostarará en un combo los _nombreGrupo que componen la bonificación 
	Y que tengan al menos un producto en el portafolio viegente del cliente
	Y mostrará los grupos ordenados por _idGrupo
	Y preseleccionará el primer grupo
	Y mostrará el _codigo y _nombre de los productos que componen el grupo seleccionado y que estén en el portafolio vigente del cliente
	Y mostrará el _unidadesBeneficioGrupo
	Y el control para ingresar cantidad
	Y mostrará la cantidad ingresada, si hubiere
    Y los controles para + y - 
