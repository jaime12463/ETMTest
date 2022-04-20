import React from 'react';
import {Container} from './Container';
import {Titulo, TituloProps} from './Titulo';
import {PromoPush, PromoPushProps} from './PromoPush';
import {Tarjeta, TarjetaProps} from './Tarjeta';
import {Envases, EnvasesProps} from './Envases';
import {Canjes, CanjesProps} from './Canjes';
import {Bonificaciones, BonificacionesProps} from './Bonificaciones';
import {CompromisoDeCobro} from './CompromisoDeCobro';
import {OrdenDeCompra, OrdenDeCompraProps} from './OrdenDeCompra';
import {PromoOngoing, PromoOngoingProps} from './PromoOngoing';

interface Props {
	Bonificaciones: React.FC<BonificacionesProps>;
	Canjes: React.FC<CanjesProps>;
	CompromisoDeCobro: React.FC;
	Container: React.FC;
	Envases: React.FC<EnvasesProps>;
	OrdenDeCompra: React.FC<OrdenDeCompraProps>;
	PromoOngoing: React.FC<PromoOngoingProps>;
	PromoPush: React.FC<PromoPushProps>;
	Tarjeta: React.FC<TarjetaProps>;
	Titulo: React.FC<TituloProps>;
}

export const Resumen: React.FC & Props = ({children}) => {
	return <Container>{children}</Container>;
};

Resumen.Bonificaciones = Bonificaciones;
Resumen.Canjes = Canjes;
Resumen.CompromisoDeCobro = CompromisoDeCobro;
Resumen.Container = Container;
Resumen.Envases = Envases;
Resumen.OrdenDeCompra = OrdenDeCompra;
Resumen.PromoOngoing = PromoOngoing;
Resumen.PromoPush = PromoPush;
Resumen.Tarjeta = Tarjeta;
Resumen.Titulo = Titulo;
