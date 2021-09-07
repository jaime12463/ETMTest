# language: es

@Pedido @Validar_subunidades @Validar_minimo_subunidades @Sprint3 @sprint4 @Sprint10 @Sprint11

# Sprint11:
# Validación de presupuesto y productos habilitados para el tipo de pedido
# Cuando se ingresa un producto en canje se tiene que validar la cantidad de unidades + subunidades, contra el presupuesto tipo de pedido - los productos que ya se registraron para ese tipo de pedido en todos cliente de la ruta.
#
# Calculo del presupuesto disponible del producto
# presupuestoActual = _presupuesto - (unidades + subunidades) 
#    unidades = sumatoria de las unidades de todos los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta 
#    subunidades = (sumatoria de las subunidades / presentación, de cada producto de los pedidos registrados del tipo de pedido en curso cuyo _validaPresupuesto = true, que no fueron transmitidos, de todos los clientes de la ruta )
# 
# Ejemplo:
#    _presupuesto = 2 (unidades) para el _tipoPedido = 2, cuyo _validaPresupuesto = true

#    producto 350 con _presentacion = 12 
#    producto 360 con _presentacion = 24 
#    Pedido registrado de Canje N1 para el cliente 2345: 
#           350 X unidades = 1, subunidades = 3 -> 1 unidad + 3/12 unidades = 1.25 unidades
#    Pedido registrado de Canje N2 para el cliente 5403: 
#           360 X unidades = 0, subunidades = 12  -> 0 unidades + 12/24 unidades = 0.50 unidades
#
#    presupuestoActual = _presupuesto - ( unidades consumidas) = 2 - (1.25+0.50) = 0.75





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
	
	
Escenario: N°1 – Ingreso de subunidad correcta y no requiere motivo y el tipo de pedido del pedido en curso no valida presupuesto
    Dado que el producto tiene una _presentacion 
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Y _requiereMotivo = false
    Y tipo de pedido del pedido en curso tiene _validaPresupuesto = false
    Cuando se ingresan subunidades
    Entonces el sistema registrará las subunidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.

Escenario: N°2 – Ingreso de subunidad correcta y no requiere motivo y el tipo de pedido del pedido en curso valida presupuesto y cumple con el mismo
    Dado que el producto tiene una _presentacion 
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Y _requiereMotivo = false
    Y tipo de pedido del pedido en curso tiene _validaPresupuesto = true
    Cuando se ingresan subunidades
    Y presupuestoActual - cantidad de unidades ingresadas - cantidad de subunidades ingresadas  >= 0   
    Entonces el sistema registrará las subunidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.

 Escenario: N°3 – Ingreso de subunidad correcta y requiere motivo y el tipo de pedido del pedido en curso valida presupuesto y cumple con el mismo
    Dado que el producto tiene una _presentacion 
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Y _requiereMotivo = true
    Y tipo de pedido del pedido en curso tiene _validaPresupuesto = true
    Cuando se ingresan subunidades
    Y presupuestoActual - cantidad de unidades ingresadas - cantidad de subunidades ingresadas  >= 0    Entonces el sistema registrará las subunidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.
    Entonces el sistema registrará las subunidades y continuará con el ingreso del motivo

#Cuando se ingresa un producto nuevo, se asume como condición de pago del producto la condición de pago general del pedido. 

Escenario: N°4 – Ingreso de subunidades mayor o igual que la presentación
    Dado que el producto tiene una _presentacion 
    Cuando se ingresan subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser menores a la presentación _presentacion” y permanecerá en la pantalla para corregir

Escenario: N°5 – Ingreso de subunidades no es múltiplo
    Dado que el producto tiene _presentacion
	Y que el tipo de pedido tiene _validaSubunidadesMinimas = true
    Y tiene _subunidadesVentaMinima
    Cuando se ingresan subunidades
    Entonces el sistema mostrará el mensaje “Las subunidades debe ser en múltiplos de _subunidadesVentaMinima ” y permanecerá en la pantalla para corregir

Escenario: N°6 – Ingreso de subunidad no cumple con el presupuesto para el tipo de pedido del pedido en curso que valida presupuesto
    Dado que el tipo de pedido del pedido en curso tiene _validaPresupuesto = true
    Cuando se ingresan subunidades
    Y presupuestoActual - cantidad de unidades ingresadas - cantidad de subunidades ingresadas < 0 
    Entonces el sistema mostrará el mensaje  "La cantidad ingresada excede el presupuesto asignado para el " & _descripción del _tipoPedido y permanecerá en el ingreso de la cantidad de subunidades.
