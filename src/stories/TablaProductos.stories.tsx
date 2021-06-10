import React from 'react';
import { Story, Meta } from '@storybook/react';
import TablaProductos, { Props } from '../components/TablaProductos';

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

			codigoProducto: '1860',
			nombre: 'COCA COLA',
			presentacion: 12,
			precios: [
				{
					precioConImpuesto: "100",
					vigenciaInicioPrecio: "4-3-2",
					vigenciaFinPrecio: "4-3-2",
				}
			],
		},
	],
};
