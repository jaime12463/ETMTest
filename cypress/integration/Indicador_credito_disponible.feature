# language: es

@Pedido @Inidicador_credito @Sprint8 

# sprint 8 UX: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3

Característica: Indicador de crédito disponible
    Como prevendedor cuando estoy en la pantalla del ingreso del pedido
    Quiero ver el crédito disponible del cliente
    Para saber si le puedo registrar un pedido a crédito

Escenario: N°1 - Ver crédito disponible 
    Dado que el cliente no tiene _condición de pago contado
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema mostrará el total del indicador igual a crédito _disponible informado – pedidos a crédito registrado por el prevendor 
    Y el avance según la suma de los montos de los pedidos de crédito registrados para la misma fecha de entrega más monto de los productos de crédito del pedido en curso

# Ejemplo de avance de credito.
#Crédito disponible productos crédito Avance 		Texto		Color
#3000		0			100%		$3000.00	verde
#3000		300			90%		$2700.00	verde
#3000		3000			0%		$0.00		verde
#3000		3001			0%		$-1.00		rojo

Escenario: N°2: Ocultar indicador de crédito disponible
    Dado que el cliente tiene _condición de pago contado
    Cuando estoy en la pantalla de ingreso del pedido
    Entonces el sistema no mostrará el indicador de crédito disponible 
