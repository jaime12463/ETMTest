# language: es

@Pedido @Envases @Sprint12

# sprint 12 UX: https://www.figma.com/file/a6j0OiJCxmdy9DupAaFiac/Order-taking-SFA?node-id=0%3A1

# Tarjeta de envases. Título: Envases. Cantidad: "2 envases"

Característica: Mostrar tarjeta de envases
    Como prevendedor
    Quiero ver la tarjeta de envases para retorno
    Para gestionar al cliente los envases

Escenario: N°1 - Mostrar tarjeta de envases
    Dado que existe un pedido cuyo tipo de pedido tiene _generaEnvases = true 
    Cuando estamos en la fase 3 - otros de la pantalla del sistema
    Entonces el sistema mostrará la tarjeta de envases con su título
    Y la cantidad de items que contiene la tarjeta