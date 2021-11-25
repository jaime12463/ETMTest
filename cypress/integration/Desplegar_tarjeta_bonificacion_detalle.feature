# language: es

@Pedido @Bonificacion @Paso3 @Sprint17

Característica: Desplegar grupo de bonificaciones
	Como prevendedor
	Quiero desplegar los grupos de bonificaciones
	Para ver y otorgar bonificaciones al cliente

Escenario: N°1 - Desplegar detalle de bonificacion
	Dado que se desplegó la tarjeta de bonificacion
	Cuando selecciono el control desplegar el detalle
	Entonces el sistema mostarará en un combo los _nombreGrupo_ que componen la bonificación ordenados por _secuenciaGrupoBonificacion_
	Y preseleccionará el primer grupo
	Y mostrará el _codigo_ y _nombre_ de los productos que componen el grupo seleccionado y que estén en el portafolio vigente del cliente
	Y mostrará el _unidadesBeneficioGrupo
	Y el control para ingresar cantidad
    Y los controles para + y - 