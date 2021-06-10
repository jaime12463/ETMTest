import React from 'react';
import { Story, Meta } from '@storybook/react';
import FormularioAgregarProducto, {
	Props,
} from '../components/FormularioAgregarProducto';

export default {
	title: 'Componentes/FormularioAgregarProducto',
	component: FormularioAgregarProducto,
} as Meta;

const Template: Story<Props> = (args) => (
	<FormularioAgregarProducto {...args} />
);

export const Primero = Template.bind({});
Primero.args = {
	productoActual: { codigoProducto: 'test', unidades: 1, subUnidades: 1, precioConImpuestoUnidad: 100, precioConImpuestoSubunidad: 10 }
};
