import {Story} from '@storybook/react';
import Dialogo, {Props} from '../components/Dialogo';

export default {
	title: 'Componentes/Dialogo',
	component: Dialogo,
};

const Template: Story<Props> = (args) => <Dialogo {...args} />;

export const base = Template.bind({});
base.args = {
	mensaje: 'Esto es una notificacion simple',
    handle: console.log
};

export const conBotones = Template.bind({});
conBotones.args = {
	mensaje: '¿Desea usted continuar?',
	botones: ['Si', 'No'],
	handle: console.log,
};
