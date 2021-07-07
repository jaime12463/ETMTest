# language: es

Característica: Aviso en ingreso de unidades maximas por producto
	Como prevendedor
	Quiero que al ingresar una cantidad mayor a 100 en las unidades el sistema me avise
	Para corregir los datos si fuera necesario.

@Test_dispositivo_3
Escenario: N°3 - Las unidadesMaximasVenta no está definido para el cliente
	Dado que el cliente no tiene configurado las unidadesMaximasVenta
	Cuando se ingresan las unidades del pedido del cliente
	Entonces el sistema no realizará validación de unidades ingresadas