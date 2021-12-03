import React from 'react';
import DesplegableBonificaciones from './DesplegableBonificaciones';
import Stack from '@mui/material/Stack';

const Bonificaciones: React.FC = () => {
	const [expandido, setExpandido] = React.useState<boolean | string>(false);

	return (
		<Stack marginTop='18px' spacing='18px'>
			<DesplegableBonificaciones
				expandido={expandido}
				setExpandido={setExpandido}
				id={'TODO'}
			/>
		</Stack>
	);
};

export default Bonificaciones;
