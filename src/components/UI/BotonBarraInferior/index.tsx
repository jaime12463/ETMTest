import {FunctionComponent} from 'react';
import {formatearNumero} from 'utils/methods';
import Button from '@mui/material/Button';
import {Box, Grid, Stack} from '@mui/material';
import {useTranslation} from 'react-i18next';

type Props = {
	numeroItems: string;
	descripcion: string;
	total: number;
	onClick: (e: any) => void;
};

export const BotonBarraInferior: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();
	return (
		<Button
			variant='contained'
			size='large'
			color='success'
			fullWidth
			style={{borderRadius: '24px', color: 'white', padding: '8px 12px'}}
			onClick={props.onClick}
		>
			<Grid
				container
				direction='row'
				alignItems='center'
				justifyContent='center'
			>
				<Grid item xs={3}>
					<div
						style={{
							background: 'rgba(0, 0, 0, 0.35)',
							borderRadius: '14px',
							padding: '4px',
							width: '80px',
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
								lineHeight: '10px',
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
						textTransform: 'none',
						paddingLeft: '8px',
					}}
				>
					{props.descripcion}
				</Grid>
				<Grid
					item
					xs={3}
					style={{fontSize: '20px', fontWeight: 600, lineHeight: '24px'}}
				>
					{formatearNumero(props.total, t)}
				</Grid>
			</Grid>
		</Button>
	);
};
