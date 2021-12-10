import React from 'react';
import {Container, ContainerProps} from './Container';
import {Titulo, TituloProps} from './Titulo';
import {PromoPush, PromoPushProps} from './PromoPush';
import {Tarjeta, TarjetaProps} from './Tarjeta';
import {Envases, EnvasesProps} from './Envases';
import {Canjes, CanjesProps} from './Canjes';
import {Bonificaciones, BonificacionesProps} from './Bonificaciones';
import {CompromisoDeCobro, CompromisoDeCobroProps} from './CompromisoDeCobro';

interface Props {
	Container: React.FC<ContainerProps>;
	Titulo: React.FC<TituloProps>;
	PromoPush: React.FC<PromoPushProps>;
	Tarjeta: React.FC<TarjetaProps>;
	Envases: React.FC<EnvasesProps>;
	Canjes: React.FC<CanjesProps>;
	Bonificaciones: React.FC<BonificacionesProps>;
	CompromisoDeCobro: React.FC<CompromisoDeCobroProps>;
}

const Resumen: React.FC & Props = ({children}) => {
	return <Container>{children}</Container>;
};

Resumen.Container = Container;
Resumen.Titulo = Titulo;
Resumen.PromoPush = PromoPush;
Resumen.Tarjeta = Tarjeta;
Resumen.Envases = Envases;
Resumen.Canjes = Canjes;
Resumen.Bonificaciones = Bonificaciones;
Resumen.CompromisoDeCobro = CompromisoDeCobro;

export default Resumen;
