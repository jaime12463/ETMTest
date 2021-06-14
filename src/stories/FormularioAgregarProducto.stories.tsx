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

/* export const Primero = Template.bind({});
Primero.args = {
	agregarProductoAlPedidoCliente: {
		codigoProducto: '211',
		codigoCliente: 'test',
		unidades: 1,
		subUnidades: 1,
	},
};
 */