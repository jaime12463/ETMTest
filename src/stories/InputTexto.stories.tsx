
import {Story, Meta} from '@storybook/react';

import InputTexto, {Props} from '../components/Input';

export default {
	title: 'Componentes/InputTexto',
	component: InputTexto,
};

const Template: Story<Props> = (args) => <InputTexto {...args} />;

export const Cliente = Template.bind({});
Cliente.args = {
	label: 'Cliente',
	type: 'text',
};

export const Buscar = Template.bind({});
Buscar.args = {
	label: 'Buscar',
	type: 'text',
};

export const Unidades = Template.bind({});
Unidades.args = {
	label: 'Unidades',
	type: 'number',
};
