import {FunctionComponent} from 'react';
import Button from '@mui/material/Button';
import {Box, Grid, Stack} from '@mui/material';

type Props = {
	numeroItems: number;
	descripcion: string;
	total: string;
	onClick: (e: any) => void;
};

export const BotonBarraInferior: FunctionComponent<Props> = (props) => {
	return (
		<Button
			variant='contained'
			size='large'
			color='success'
			fullWidth
			style={{borderRadius: '24px', color: 'white'}}
			onClick={props.onClick}
		>
			<Grid
				container
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				paddingY={0.2}
			>
				<Grid item xs={3}>
					<div
						style={{
							background: 'rgba(0, 0, 0, 0.35)',
							borderRadius: '14px',
							paddingTop: '4px',
							paddingBottom: '4px',
						}}
					>
						<span
							style={{
								fontSize: '20px',
								fontWeight: 600,
								lineHeight: '24px',
								marginRight: '4px',
							}}
						>
							{props.numeroItems}
						</span>
						<span
							style={{
								fontSize: '10px',
								fontWeight: 'bold',
								lineHeight: '18px',
								textTransform: 'uppercase',
							}}
						>
							ITEMS
						</span>
					</div>
				</Grid>
				<Grid
					item
					xs={6}
					style={{
						fontSize: '14px',
						fontWeight: 'normal',
						lineHeight: '14px',
						textAlign: 'center',
					}}
				>
					{props.descripcion}
				</Grid>
				<Grid
					item
					xs={3}
					style={{fontSize: '20px', fontWeight: 600, lineHeight: '24px'}}
				>
					{props.total}
				</Grid>
			</Grid>
		</Button>
	);
};
