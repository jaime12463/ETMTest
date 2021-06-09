import React from 'react';
import {Story, Meta} from '@storybook/react';
import TablaProductos, {Props} from '../components/TablaProductos';

export default {
	title: 'Componentes/TablaProductos',
	component: TablaProductos,
} as Meta;

const Template: Story<Props> = (args) => <TablaProductos {...args} />;

export const Primero = Template.bind({});
Primero.args = {
	titulos: ['Producto', 'Precio'],
	productos: [
		{
			codigoproducto: '1860',
			precioConImpuesto: '106.0',
			nombre: 'COCA COLA',
			iniVig: '0',
			finVig: '0',
		},
	],
};
