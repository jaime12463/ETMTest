
import {Story, Meta} from '@storybook/react';
import {MemoryRouter} from 'react-router';

import TarjetaPedido, {Props} from '../components/TarjetaPedido';

export default {
	title: 'Componentes/TarjetaPedido',
	component: TarjetaPedido,
	decorators: [
		(Story: any) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	], //Wrapping the story inside the router
};

const Template: Story<Props> = (args) => <TarjetaPedido {...args} />;

export const Primero = Template.bind({});
Primero.args = {};
