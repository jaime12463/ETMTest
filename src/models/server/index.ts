//db.json
export type TDatosClientesProductos = {
	clientes: TClientes;
	productos: TProductos;
	presupuestoTipoPedido: TpresupuestoTipoPedido[];
	iniciativas: TIniciativas[];
	bonificaciones: TBonificaciones[];
	sabores: TListaDataSecundaria;
	familias: TListaDataSecundaria;
	medidas: TListaDataSecundaria;
	marcas: TListaDataSecundaria;
	envases: TListaDataSecundaria;
	promociones: TListaPromoOngoing;
};

/*
	ESTRUCTURAS SECUNDARIAS
*/

export type TDataSecundaria = {
	id: number;
	descripcion: string;
};

export type TListaDataSecundaria = Record<number, TDataSecundaria>;

/* */

export type TPromoOngoing = {
	promocionID: number;
	descripcion: string;
	tipo: number;
	aplicacion: string;
	asignacion: string;
	inicioVigenciaPromocion: string;
	finVigenciaPromocion: string;
};

export type TListaPromoOngoing = Record<number, TPromoOngoing>;

export type TIniciativas = {
	idActividadIniciativa: number;
	nombreIniciativa: string;
	nombreActividadPlan: string;
	descripcionIniciativa: string;
	finVigenciaIniciativa: string;
	idMaterialIniciativa: number;
	unidadVentaIniciativa: number;
	subunidadVentaIniciativa: number;
	archivoAdjunto?: string;
};

export type TBonificaciones = {
	idBonificacion: number;
	nombreBonificacion: string;
	vigenciaInicioBonificacion: string;
	vigenciaFinBonificacion: string;
	aplicacionBonificacion: string;
	gruposBonificacion: TGruposBonificacion[];
};

export type TGruposBonificacion = {
	idGrupo: number;
	nombreGrupo: string;
	cantidadBeneficioGrupo: number;
	unidadMedida: string;
	productosBeneficioGrupo: number[];
};

export type TClientes = {
	[codigoCliente: string]: TCliente;
};

export type TProductos = {
	[codigoProducto: number]: TProducto;
};

export type TCliente = {
	codigoCliente: string;
	visitasPlanificadas: TVisitaPlanificada[];
	fechasEntrega: TFechaEntrega[];
	detalles: TDetalle;
	informacionCrediticia: TInformacionCrediticia;
	iniciativasHabilitadas: TIniciativasHabilitadas[];
	coberturas: TCoberturas[];
	configuracionPedido: TConfiguracionPedido;
	portafolio: TPortafolio[];
	bonificacionesHabilitadas?: TBonificacionesHabilitadas[];
};

export type TProducto = {
	codigoProducto: number;
	nombre: string;
	presentacion: number;
	subunidadesVentaMinima: number;
	implicito1?: number;
	implicito2?: number;
	tipoProducto: number;
	promoPush?: TPromoPush;
	atributos?: TAtributos;
};

export type TAtributos = {
	sabores: number;
	familias: number;
	medidas: number;
	marcas: number;
	envases: number;
};

export type TPromoPush = {
	codigoPromocion: number;
	componentes: TPromoPushComponente[];
};

export type TPromoPushComponente = {
	codigoProducto: number;
	cantidad: number;
	unidadMedida: string;
};

export type TVisitaPlanificada = {
	dia: string;
	secuencia: number;
};

export type TFechaEntrega = {
	fechaVisita: string;
	fechaEntrega: string;
};

export type TDetalle = {
	nombreComercial: string;
};

export type TCoberturas = {
	grupoCobertura: string;
	secuenciaGrupoCobertura: number;
	productosGrupoCobertura: number[];
};

export type TIniciativasHabilitadas = {
	idActividadIniciativa: number;
	secuenciaCliente: number;
};

export type TBonificacionesHabilitadas = {
	idBonificacion: number;
	bonificacionesDisponibles: number;
};

export type TInformacionCrediticia = {
	condicion: TCondicicon;
	limite?: number;
	disponible?: number;
	esCreditoBloqueado: boolean;
	esBloqueadoVenta: boolean;
	documentos?: TDocumento[];
};
export type TCondicicon = 'contado' | 'creditoFormal' | 'creditoInformal';
export type TConfiguracionPedido = {
	canjeHabilitado: boolean;
	ventaMinima?: TVentaMinima;
	ventaContadoMaxima?: TVentaContadoMaxima;
	cantidadMaximaUnidades?: number;
};

export type TTipoPedidoHabilitado = string;

export type TVentaMinima = {
	montoVentaMinima: number;
	cumplimientoPorFecha: TCumplimientoPorFecha[];
};

export type TCumplimientoPorFecha = {
	fechaEntrega: string;
	cumplido: boolean;
};

export type TVentaContadoMaxima = {
	montoVentaContadoMaxima: number;
	consumidoPorFecha: TConsumidoPorFecha[];
};

export type TConsumidoPorFecha = {
	fechaEntrega: string;
	consumido: number;
};

export type TPortafolio = {
	codigoProducto: number;
	esVentaSubunidades: boolean;
	unidadesDisponibles?: number;
	precios: TPrecio[];
	descuentoPolarizado?: TDescuentoPolarizado[];
	descuentoEscalonado?: TDescuentoEscalonado[];
};

export type TDescuentoEscalonado = {
	unidadesDesde: number;
	unidadesHasta: number;
	porcentajeDescuentoEscalonado: number;
};

export type TDescuentoPolarizado = {
	precioVentaAlPublicoDesde: number;
	precioVentaAlPublicoHasta: number;
	porcentajeDescuentoPolarizado: number;
	claseCondicionPolarizado: string;
};

export type TPrecio = {
	precioConImpuestoUnidad: number;
	precioConImpuestoSubunidad: number;
	vigenciaInicioPrecio: string;
	vigenciaFinPrecio: string;
	descuento: number;
	componentes: TComponente[];
	precioConDescuentoUnidad?: number;
	precioConDescuentoSubunidad?: number;
};

export type TComponente = {
	codigoProducto: number;
	precioBase: number;
	descuento: number;
	precioFinal: number;
};

export type TDocumento = {
	numero: number;
	fecha: string;
	vencimiento: string;
	monto: number;
};

export type TpresupuestoTipoPedido = {
	tipoPedido: string;
	presupuesto: number;
	vigenciaInicioPresupuesto: string;
	vigenciaFinPresupuesto: string;
	tieneProductosHabilitados: boolean;
	productosHabilitados: number[];
};

//configuraciones.json
export type TDatosConfiguracion = {
	configuraciones: TConfiguracion;
};

export type TConfiguracion = {
	maximoGrupoCoberturaAMostrar: number;
	esFrecuenciaAbierta: boolean;
	habilitaOrdenDeCompra: boolean;
	bonificacionesConVenta: boolean;
	tipoPedidoEnvasesHabilitados: string[];
	tipoPedidos: TTipoPedido[];
	motivosCancelacionIniciativas: TMotivosCancelacionIniciativas[];
};

export type TMotivosCancelacionIniciativas = {
	codigo: number;
	descripcion: string;
};

export type TTipoPedido = {
	codigo: string;
	descripcion: string;
	descripcionCorta: string;
	secuencia: number;
	esValorizado: boolean;
	esMandatorio: boolean;
	habilitaPromocion: boolean;
	contribuyeAMinimo: boolean;
	habilitaSubunidades: 'condicional' | 'nunca' | 'siempre'; //TODO: Cambiar esto a un enum
	validaSubunidadesMinimas: boolean;
	tipoProductosHabilitados: number[];
	generaEnvases: boolean;
	requiereMotivo: boolean;
	catalogoMotivos: TCatalogoMotivo[];
	validaPresupuesto: boolean;
};

export type TCatalogoMotivo = {
	codigo: number;
	descripcion: string;
};
