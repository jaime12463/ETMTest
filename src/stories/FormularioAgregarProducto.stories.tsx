import {Story} from '@storybook/react';
import FormularioAgregarProducto, {
	Props,
} from '../components/FormularioAgregarProducto';

export default {
	title: 'Componentes/FormularioAgregarProducto',
	component: FormularioAgregarProducto,
};

const Template: Story<Props> = (args) => (
	<FormularioAgregarProducto {...args} />
);

export const Primero = Template.bind({});
Primero.args = {
	agregarProductoAlPedidoCliente: ({
		codigoProductoConNombre,
		unidades,
		subUnidades,
	}) => {},
	buscarPreciosProductos: ({
		codigoProductoConNombre,
		unidades,
		subUnidades,
	}) => {},
	handleSubmit: undefined,
};
