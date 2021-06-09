import React from 'react';
import {Story, Meta} from '@storybook/react';

import InputTexto, {Props} from '../components/InputTexto';

export default {
	title: 'Componentes/InputTexto',
	component: InputTexto,
} as Meta;

const Template: Story<Props> = (args) => <InputTexto {...args} />;

export const Cliente = Template.bind({});
Cliente.args = {
	label: 'Cliente',
	size: 'small',
	type: 'text',
};

export const Buscar = Template.bind({});
Buscar.args = {
	label: 'Buscar',
	size: 'medium',
	type: 'text',
};

export const Unidades = Template.bind({});
Unidades.args = {
	label: 'Unidades',
	size: 'medium',
	type: 'number',
};
