import {Story} from '@storybook/react';
import Dialogo, {Props} from 'components/UI/Dialogo';

export default {
	title: 'Componentes/Dialogo',
	component: Dialogo,
};

const Template: Story<Props> = (args) => <Dialogo {...args} />;

export const base = Template.bind({});
base.args = {
	titulo: 'Esto es una notificacion simple',
	manejadorClick: console.log,
};

export const conBotones = Template.bind({});
conBotones.args = {
	titulo: '¿Desea usted continuar?',
	conBotonCancelar: true,
	manejadorClick: console.log,
};
