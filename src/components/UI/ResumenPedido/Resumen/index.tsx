import React from 'react';
import {Container} from './Container';
import {Titulo, TituloProps} from './Titulo';
import {TituloPromo} from './TituloPromo';
import {PromoPush, PromoPushProps} from './PromoPush';
import {Tarjeta, TarjetaProps} from './Tarjeta';
import {Envases, EnvasesProps} from './Envases';
import {Canjes, CanjesProps} from './Canjes';
import {Bonificaciones, BonificacionesProps} from './Bonificaciones';
import {CompromisoDeCobro, CompromisoDeCobroProps} from './CompromisoDeCobro';
import {OrdenDeCompra, OrdenDeCompraProps} from './OrdenDeCompra';

interface Props {
	Container: React.FC;
	Titulo: React.FC<TituloProps>;
	TituloPromo: React.FC;
	PromoPush: React.FC<PromoPushProps>;
	Tarjeta: React.FC<TarjetaProps>;
	Envases: React.FC<EnvasesProps>;
	Canjes: React.FC<CanjesProps>;
	Bonificaciones: React.FC<BonificacionesProps>;
	CompromisoDeCobro: React.FC<CompromisoDeCobroProps>;
	OrdenDeCompra: React.FC<OrdenDeCompraProps>;
}

const Resumen: React.FC & Props = ({children}) => {
	return <Container>{children}</Container>;
};

Resumen.Container = Container;
Resumen.Titulo = Titulo;
Resumen.TituloPromo = TituloPromo;
Resumen.PromoPush = PromoPush;
Resumen.Tarjeta = Tarjeta;
Resumen.Envases = Envases;
Resumen.Canjes = Canjes;
Resumen.Bonificaciones = Bonificaciones;
Resumen.CompromisoDeCobro = CompromisoDeCobro;
Resumen.OrdenDeCompra = OrdenDeCompra;

export default Resumen;
