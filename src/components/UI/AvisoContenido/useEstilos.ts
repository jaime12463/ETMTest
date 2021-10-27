import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';

interface Props {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			alignItems: 'start',
			backgroundColor: (props: Props) => {
				switch (props.tipo) {
					case 'error':
						return '#FFB7B1';
					case 'success':
						return '#D6FBE0';
					case 'warning':
						return 'rgba(255, 251, 239, 0.95);';
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			border: '1.5px solid #FF0000',
			borderRadius: '10px',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '8px 8px 15px 8px',
		},
		content: {
			display: 'flex',
			gap: '8px',
		},
		text: {
			display: 'flex',
			flexDirection: 'column',
			gap: '6px',
		},
	})
);

export default useEstilos;
