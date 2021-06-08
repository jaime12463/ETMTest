import React from 'react';
import {Story, Meta} from '@storybook/react';
import Estructura, {Props} from '../components/Estructura';

export default {
	title: 'Componentes/Estructura',
	component: Estructura,
} as Meta;

const Template: Story<Props> = (args) => <Estructura {...args} />;

export const base = Template.bind({});
base.args = {
	titulo: 'Bienvenido',
};

export const conLogoInferior = Template.bind({});
conLogoInferior.args = {
	titulo: 'Bienvenido',
	esConLogoInferior: true,
	esConFechaHaciaAtras: false,
};
