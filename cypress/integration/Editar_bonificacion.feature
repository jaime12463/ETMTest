# language: es

@Pedido @Bonificacion @Sprint17

# _disponible_ = es _cantidadBeneficioGrupo - cantidades ingresadas de todos los productos del mismo grupo

Característica: Editar bonificaciones
    Como prevendedor
    Quiero darle un tratamiento a las bonificiaciones
    Para darle al cliente beneficios

Escenario: N°1 - Agregar productos beneficio con disponible
    Dado que se desplegó el detalle de una bonificación
    Y hay _disponible_ > 0
    Cuando se ingresan cantidades a un producto
    Entonces el sistema agregará la cantidad ingresada
    Y actualizará el _disponible_
    Y mostrará el control para restablecer a cero las cantidades

Escenario: N°2 - Agregar productos beneficio sin disponible
    Dado que se desplegó el detalle de una bonificación
    Y hay _disponible_ > 0
    Cuando se ingresan cantidades a un producto
    Y supera el _disponible_
    Entonces el sistema dará aviso que supera la _cantidadBeneficioGrupo 
    Y no agregará el producto beneficio

Escenario: N°3 - Agregar productos beneficio teniendo producto agregado de otro grupo
    Dado que se desplegó el detalle de una bonificación
    Y hay _disponible_ > 0
    Y hay productos ingresados de otro grupo de bonificación
    Cuando se ingresan cantidades a un producto
    Y el disponible del grupo al cual se está ingresando producto es _disponible_  >= 0
    Entonces el sistema dará aviso que hay productos ingresados en otro grupo, si desea borrarlo
    Y si acepta, borrará el ingreso del otro grupo
    Y agregará el producto del nuevo grupo. 

Escenario: N°4 - Quitar productos beneficio
    Dado que se desplegó el detalle de una bonificación
    Cuando se quitan cantidades a un producto
    Entonces el sistema restará la cantidad ingresada
    Y actualizará el disponible del grupo

Escenario: N°5 - Validar aplicación de bonificacion
    Dado que se desplegó el detalle de una bonificación
    Y _aplicacionBonificacion = "Total"
    Y se ingresó cantidad a un producto
    Y _disponible_ > 0
    Cuando finalizamos bonificaciones
    Entonces el sistema avisará que faltan productos por ingresar
    Y permanecerá en bonificaciones para continuar con el ingreso 

Escenario: N°6 - Reestablecer cantidades
    Dado que se ingresaron productos de bonificación
    Y se muestró el control para reestablecer cantidades
    Cuando selecciono reestablecer las cantidades
    Entonces el sistema avisará que se borrarán las bonificaciones ingresadas
    Y preguntará si desea contiunar
    Y si continúa, eliminará las cantidades ingresadas dejandolas en 0
    Y actualizará el _disponible_