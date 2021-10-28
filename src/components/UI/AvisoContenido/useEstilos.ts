import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	conBotones: boolean;
}

const useEstilos = makeStyles(() =>
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
			border: (props: Props) => {
				switch (props.tipo) {
					case 'error':
						return `1.5px solid ${theme.palette.primary.main}`;
					case 'success':
						return `1.5px solid ${theme.palette.success.main}`;
					case 'warning':
						return `1.5px solid ${theme.palette.warning.main}`;
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			borderRadius: '10px',
			display: 'flex',
			flexDirection: (props: Props) => (props.conBotones ? 'column' : 'row'),
			justifyContent: 'space-between',
			padding: (props: Props) =>
				props.conBotones ? '12px 8px 18px 8px' : '8px 8px 15px 8px',
		},
		content: {
			alignItems: (props: Props) => (props.conBotones ? 'center' : 'start'),
			display: 'flex',
			flexDirection: (props: Props) => (props.conBotones ? 'column' : 'row'),
			gap: (props: Props) => (props.conBotones ? '18px' : '8px'),
			justifyContent: (props: Props) => (props.conBotones ? 'center' : 'start'),
			marginBottom: (props: Props) => (props.conBotones ? '22px' : '0'),
			width: '100%',
		},
		text: {
			display: 'flex',
			flexDirection: 'column',
			gap: '6px',
		},
		btn: {
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'space-evenly',
			width: '100%',
		},
	})
);

export default useEstilos;
