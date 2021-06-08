import React from 'react';
import {Story, Meta} from '@storybook/react';
import {MemoryRouter} from 'react-router';

import TarjetaPedido, {Props} from '../components/TarjetaPedido';

export default {
	title: 'Componentes/TarjetaPedido',
	component: TarjetaPedido,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	], //Wrapping the story inside the router
} as Meta;

const Template: Story<Props> = (args) => <TarjetaPedido {...args} />;

export const Primero = Template.bind({});
Primero.args = {
	pedido: [],
};
