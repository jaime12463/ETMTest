import {FunctionComponent} from 'react';
import Button from '@mui/material/Button';
import {Grid} from '@mui/material';

type Props = {};

export const BotonBarraInferior: FunctionComponent<Props> = (props) => {
	return (
		<Button
			variant='contained'
			size='large'
			color='success'
			fullWidth
			style={{borderRadius: '24px', color: 'white'}}
		>
			<Grid container>
				<Grid item xs={3}>
					<div
						style={{background: 'rgba(0, 0, 0, 0.35)', borderRadius: '14px'}}
					>
						000 ITEMS
					</div>
				</Grid>
				<Grid item xs={6}>
					Continuar a Toma de pedido
				</Grid>
				<Grid item xs={3}>
					$ 00,00
				</Grid>
			</Grid>
		</Button>
	);
};
