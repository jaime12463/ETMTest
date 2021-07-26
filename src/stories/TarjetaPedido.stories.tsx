import {Story, Meta} from '@storybook/react';
import {MemoryRouter} from 'react-router';
import TotalPedido, {Props} from 'components/Negocio/TotalPedido';

export default {
	title: 'Componentes/TotalPedido',
	component: TotalPedido,
	decorators: [
		(Story: any) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	], //Wrapping the story inside the router
};

const Template: Story<Props> = (args) => <TotalPedido {...args} />;

export const Primero = Template.bind({});
Primero.args = {};
