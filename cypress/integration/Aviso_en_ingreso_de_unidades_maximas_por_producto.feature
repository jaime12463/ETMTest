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
