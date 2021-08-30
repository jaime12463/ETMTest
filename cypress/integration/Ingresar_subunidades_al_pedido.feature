# language: es

@Pedido @Validar_subunidades @Validar_minimo_subunidades @Sprint3 @sprint4 @Sprint10

# requiereMotivo del producto para el tipo de pedido que lo tenga configurado
# Sprint10: Se elimina el parametro esVentaSubunidadesRuta y se toma solo botelleo a nivel producto

# sprint 10 UX: https://www.figma.com/proto/uBjkg7VM1HtzllsNIvkLKn/SFA_S9_S10_S11?node-id=702%3A2&scaling=min-zoom&page-id=501%3A2&starting-point-node-id=702%3A2

# Cuando el tipo de operación tenga _esValorizado = true, se debe visualizar en los totales el valor monetario, unidad y subunidad.
# Cuando el tipo de operación tenga _esValorizado = false, se debe visualizar en los totales unidad y subunidad.

# Si para el cliente/ producto 
# esVentaSubunidades = true se habilita el campo de ingreso de subunidades. 
# El usuario puede ingresar subunidades menores a “presentación” del producto. 
# Si ingresa un número mayor se muestra aviso.
# Caso contrario, no se habilita el campo de ingreso de subunidades.  
# Se agrega campo esVentaSubunidades en portafolio de productos del cliente. 
# Se agrega campo presentación en el catálogo de productos. (presentación: 12)

# UX sprint 3: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=436%3A2150&scaling=scale-down&page-id=436%3A1256

# La venta por subunidad mínima requiere de un valor por producto 
# el cual indica la cantidad de subunidades mínimas a vender de dicho producto. 
# El usuario solo puede ingresar múltiplos de este valor.
# Si por ejemplo un producto cuya presentación es de 12 y la configuración 
# indica que la venta mínima son 3 subunidades, solamente se podrán 
# vender en múltiplos de 3: 3, 6 o 9 subunidades. 
# (12 subunidades no estaría permitido. Ver historia de usuario “permitir ingreso de subunidades al pedido”, escenario N2, sprint 3).
# Se debe contemplar el ingreso de cantidad 0 (ver sprint 3, “Venta por botellas”, HU Eliminar línea del pedido)
# Esto aplica solo para la operación de venta.

# UX sprint 4: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA_S4?node-id=1%3A11&scaling=min-zoom&page-id=0%3A1

# UX sprint 8: https://www.figma.com/proto/xPeVCpW4I9g39a9ZGsBoEV/SFA?node-id=329%3A3&scaling=scale-down&page-id=329%3A2&starting-point-node-id=329%3A3


Característica: Ingresar subunidades al pedido
	Como prevendedor
	Quiero ingresar una cantidad de subunidades del producto al pedido 
	Para realizar la venta.
 
Antecedentes:
	Dado que estoy en el ingreso del pedido y que se ingresó un código de producto
    Y las subunidades están habilitadas
	
	
Escenario: N°1 – Ingreso de subunidad correcta y no requiere motivo
    Dado que el producto tiene una _presentacion 
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Y _requiereMotivo = false
    Cuando se ingresan subunidades
    Entonces el sistema registrará las subunidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.


 Escenario: N°2 – Ingreso de subunidad correcta y  requiere motivo
    Dado que el producto tiene una _presentacion 
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Y _requiereMotivo = true
    Cuando se ingresan subunidades
    Entonces el sistema registrará las subunidades y continuará con el ingreso del motivo
#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

Escenario: N°3 – Ingreso de subunidades mayor o igual que la presentación
    Dado que el producto tiene una _presentacion 
    Cuando se ingresan subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser menores a la presentación _presentacion” y permanecerá en la pantalla para corregir


Escenario: N°4 – Ingreso de subunidades no es múltiplo
    Dado que el producto tiene _presentacion
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Cuando se ingresan subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser en múltiplos de _subunidadesVentaMinima ” y permanecerá en la pantalla para corregir
