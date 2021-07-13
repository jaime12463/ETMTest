# language: es

Característica: Aviso en ingreso de unidades maximas por producto
	Como prevendedor
	Quiero que al ingresar una cantidad mayor a 100 en las unidades el sistema me avise
	Para corregir los datos si fuera necesario.

@Test_dispositivo_1
Escenario: N°1 – La cantidad es mayor a la permitida
    Dado que el cliente tiene configurado las unidadesMaximasVenta
	Cuando se ingresa cantidad
	Entonces el sistema mostrará el mensaje "La cantidad es mayor a 100" Desea continuar

@Test_dispositivo_2
Escenario: N°2 – La cantidad es menor a la permitida
	Dado que el cliente tiene configurado las unidadesMaximasVenta menor
	Cuando se ingresa cantidad menor
	Entonces el sistema continuará con el ingreso del pedido

@Test_dispositivo_3
Escenario: N°3 - Las unidadesMaximasVenta no está definido para el cliente
	Dado que el cliente no tiene configurado las unidadesMaximasVenta
	Cuando se ingresan las unidades del pedido del cliente
	Entonces el sistema no realizará validación de unidades ingresadas	

@Test_dispositivo_4
Escenario: N°4 – La cantidad es igual a la permitida
	Dado que el cliente tiene configurado las unidadesMaximasVenta igual
	Cuando se ingresa cantidad igual
	Entonces el sistema continuará con el ingreso del pedido