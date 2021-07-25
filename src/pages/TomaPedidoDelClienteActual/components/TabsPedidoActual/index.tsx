import {Tabs} from 'components/UI';
import {TabVentas} from '..';
import {FunctionComponent} from 'react';

type Props = {};

const TabsPedidoActual: FunctionComponent<Props> = (props) => {
	const tabs = [
		{
			label: 'Ventas',
			component: TabVentas,
		},
		{
			label: 'Canje',
			component: <h1>Canje</h1>,
		},
		{
			label: 'Devolucion',
			component: <h1>Devolucion</h1>,
		},
	];

	return <Tabs tabs={tabs} />;
};

export default TabsPedidoActual;
