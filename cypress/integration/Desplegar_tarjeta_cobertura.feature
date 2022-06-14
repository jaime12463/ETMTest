# language: es

@Pedido @Cobertura @Desplegar @Sprint16

# Total de productos cobertura = cantidad de productos que conforman un grupo de una cobertura 
# Si el grupo está conformado por 5 productos, cuando se agregue 1 un producto al pedido
# Se muestra en la tarjeta  "1 de 5 coberturas" 

Característica: Desplegar tarjeta de cobertura
    Como prevendedor 
    Quiero ver las coberturas del cliente
    Para agregar productos al pedido

Escenario: N°1 - Desplegar cobertura
    Dado que estoy en paso 1 - planeación 
    Y el cliente tiene coberturas asignadas
    Cuando se despliega la tarjeta cobertura
    Entonces el sistema mostrará los primeros _maximoGrupoCoberturaAMostrarcoberturas grupos no cumplidos que estén asignados al cliente ordenadas por _secuenciaGrupoCobertura
    Y mostrará _grupoCobertura
    Y mostrará la cantidad total de productos que tiene dicho grupo
    Y mostrará el control para ver el detalle de cada grupo
    Y colapsará otras tarjetas del paso 1 - planeación

# Se debe validar contra los grupos de coberturas guardados (que se guardan al cerrar la visita) para saber si están cumplidas o no.    

Escenario: N°2 - Desplegar cobertura con productos en el pedido
    Dado que estoy en paso 1 - planeación
    Y se agregaron productos de las cobertura al pedido
    Cuando se despliega la tarjeta cobertura
    Entonces el sistema mostrará los primeros _maximoGrupoCoberturaAMostrarcoberturas grupos no cumplidos que estén asignados al cliente ordenadas por _secuenciaGrupoCobertura
    Y mostrará _grupoCobertura
    Y mostrará la cantidad total de productos que tiene dicho grupo
    Y mostrará el control para ver el detalle de cada grupo
    Y mostrará el control para reestablecer cantidades a cero
    Y colapsará otras tarjetas del paso 1 - planeación
    