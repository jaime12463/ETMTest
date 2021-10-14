import Typography from '@mui/material/Typography';
import { TarjetaColapsable } from 'components/UI';
import { useState } from 'react';
export const Planeacion: React.FC = () => {
	const [expandido, setExpandido] = useState<string | boolean>(false);

	return (
		<div>
			<TarjetaColapsable
					titulo={<Typography variant={'subtitle1'}>Pedidos en curso</Typography>}
					subTitulo={
						<Typography variant={'body3'}>
							Aquí se muestra un listado de pedidos que estan pendientes por entregar
						</Typography>
					}
					id='PedidosEnCurso'
					expandido={expandido}
					setExpandido={setExpandido}
				>
					<div> PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
			<TarjetaColapsable
					titulo={<Typography variant={'subtitle1'}>Sugerido para ti</Typography>}
					subTitulo={
						<Typography variant={'body3'}>
							Aquí se muestra un listado de pedidos que estan pendientes por entregar
						</Typography>
					}
					id='Sugeridos'
					expandido={expandido}
					setExpandido={setExpandido}
			>
				<div>SUGERIDOS PARA TI PEDIDOS EN CURSO</div>
			</TarjetaColapsable>
	  </div>
	);
};
