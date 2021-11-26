# language: es

@Pedido @Coberturas @Sprint16

Característica: Reestablecer las coberturas
    Como prevedendor
    Quiero volver al estado inicial todas las coberturas
    Para quitarlas del pedido al cliente

Escenario: N°1 - Reestablecer coberturas
    Dado que se ingresaron productos de coberturas al pedido
    Y se desplegó la tarjeta coberturas
    Cuando selecciono el control reestablecer cantidades a cero
    Entonces el sistema cambiará las cantidades a cero de todos los productos en las coberturas
    Y desmarcará las tarjetas, dejandolas en su estado inicial
    Y borrará del pedido los productos de cobertura
    Y actualizará los indicadores y totales
