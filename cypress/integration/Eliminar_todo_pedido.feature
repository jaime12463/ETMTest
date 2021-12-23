# language: es

@Pedido @Eliminar_todo @Sprint13

Característica: Eliminar todo del pedido
    Como prevendedor 
    Quiero borrar todos los artículos ingresados en el pedido
    Para descartar el pedido


Escenario: N°1 - Borrar todos los productos que no son promo push
    Dado que estoy en un pedido que _esMandatorio = true
    Y que posee productos ingresados
    Y existen productos cargados en otros pedidos que _esMandatorio = false 
    Y que no forman parte de _tipoPedidoEnvasesHabilitados 
    Y existe _bonificacionesConVenta_ = true
	Y se registraron bonificaciones
    Cuando selecciono borrar todo
    Entonces el sistema pide confirmación para eliminar todos los productos
    Y al aceptar se eliminarán todos los productos de todos los pedidos
    Y se borrarán las tarjetas de las pantallas
    Y eliminará las bonificaciones ingresadas

   #Mensaje: Se borrarán todos los productos de todos los pedidos realizados, desea continuar? 

Escenario: N°2 - Borrar todos los productos que no son promo push y bonificaciones no configuradas
    Dado que estoy en un pedido que _esMandatorio = true
    Y que posee productos ingresados
    Y existen productos cargados en otros pedidos que _esMandatorio = false 
    Y que no forman parte de _tipoPedidoEnvasesHabilitados 
    Y existe _bonificacionesConVenta_ = false
    Cuando selecciono borrar todo
    Entonces el sistema pide confirmación para eliminar todos los productos
    Y al aceptar se eliminarán todos los productos de todos los pedidos
    Y se borrarán las tarjetas de las pantallas

#Escenario: N°3 - Borrar todos los productos promo
#    Dado que estoy en promociones
#    Cuando selecciono restablecer cantidades a cero
#    Entonces el sistema pide confirmación para eliminar las cantidades ingresadas en los productos
#    Y al aceptar se inicializarán en 0 las cantidades de todos los productos de la promoción


   #Mensaje: Se inicializaráne en 0 todas las promociones, desea continuar? 
