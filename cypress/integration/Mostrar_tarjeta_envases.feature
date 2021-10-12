# language: es

@Pedido @Envases @Paso3 @Sprint12

# sprint 12 UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA_S12_S13_S14?node-id=871%3A5542&scaling=scale-down&page-id=871%3A5541&starting-point-node-id=871%3A5542

# Tarjeta de envases. Título: Envases. Cantidad: "2 envases"

Característica: Mostrar tarjeta de envases
    Como prevendedor
    Quiero ver la tarjeta de envases para retorno
    Para gestionar al cliente los envases

Escenario: N°1 - Mostrar tarjeta de envases
    Dado que existe un pedido cuyo tipo de pedido tiene _generaEnvases = true 
    Cuando estamos en el paso 3 - otros de la pantalla del sistema
    Entonces el sistema mostrará la tarjeta de envases con su título
    Y la cantidad de items que resultan del cálculo de generación de envases