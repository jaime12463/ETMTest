# language: es

@Pedido @Buscar_productos @Buscar_por_atributos @Sprint2

#Comentarios:
#Filtrar productos por atributos: código de producto, descripción del producto.

# UX: https://www.figma.com/proto/4sKBs7Q0Ap07bdHIXsuukt/SFA?node-id=123%3A1241&scaling=scale-down&page-id=123%3A371

Característica: Búsqueda de productos por atributos
    Como Prevendedor
    Quiero realizar la búsqueda de un producto por atributos
    Para agregarlo al pedido

Esquema del escenario: N°1 Búsqueda de producto en portafolio vigente
    Dado que el prevendedor tiene portafolio asignado y tiene precio con vigencia inicial y final
    Cuando haya ingresado al menos dos o más caracteres
    Entonces el sistema muestra solamente los productos que contienen lo ingresado por el prevendedor en su código o en su descricpción
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <fechaVigenciaInicial> <= <fechaEntrega> <= <fechaVigenciaFinal>

Ejemplos:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | 
|       01/06/2021     |  04/06/2021  |    04/06/2021      | 
|       01/06/2021     |  01/06/2021  |    02/06/2021      | 