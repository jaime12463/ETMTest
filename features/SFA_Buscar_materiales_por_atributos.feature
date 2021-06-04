@Búsqueda de materiales por atributos @Sprint2
Característica: Búsqueda de materiales por atributos
    Como Prevendedor
    Quiero realizar la búsqueda de un material por atributos
    Para agregarlo al pedido

@Test_dispositivo_1
Escenario: N°1 Búsqueda de material en portafolio vigente por atributo Descripción
    Dado que se muestra la lista de productos con los productos vigentes del portafolio del cliente 
    Cuando haya ingresado al menos dos o más
    Entonces la lista se reduce a los materiales que contienen lo ingresado por el prevendedor

@Test_dispositivo_2
Esquema del escenario: N°2 Mostrar SKUs que estén incluidos en el portafolio del cliente
    Dado que el prevendedor tiene portafolio asignado y tiene precio con vigencia inicial y final
    Cuando se realiza la búsqueda de material
    Entonces el sistema muestra solamente los materiales que cumplan la condición de búsqueda ingresada
    Y que pertenezcan al portafolio del cliente
    Y cuyo precio cumpla <fechaVigenciaInicial> <= <fechaEntrega> <= <fechaVigenciaFinal> 

Ejemplo:
| fechaVigenciaInicial | fechaEntrega | fechaVigenciaFinal |
|       01/06/2021     |  04/06/2021  |    30/06/2021      | ok
|       01/06/2021     |  04/06/2021  |    02/06/2021      | no se muestra
|       01/06/2021     |  04/06/2021  |    04/06/2021      | ok
|       01/06/2021     |  31/05/2021  |    02/06/2021      | no se muestra
|       01/06/2021     |  01/06/2021  |    02/06/2021      | ok
