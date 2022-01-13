import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'start',
			backgroundColor: ({tipo}: Props) => {
				switch (tipo) {
					case 'error':
						return '#FFD5D1';
					case 'success':
						return '#E9F9F3';
					case 'warning':
						return '#FFFBEF';
					case 'default':
						return theme.palette.secondary.dark;
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			border: ({tipo}: Props) => {
				switch (tipo) {
					case 'error':
						return `1.5px solid ${theme.palette.primary.main}`;
					case 'success':
						return `1.5px solid ${theme.palette.success.main}`;
					case 'warning':
						return `1.5px solid ${theme.palette.warning.main}`;
					case 'default':
						return `1.5px solid ${theme.palette.common.white}`;
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			borderRadius: '10px',
			display: 'flex',
			flexWrap: 'wrap',
			padding: '8px',
			width: '340px',
		},
		tituloContainer: {
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%',
		},
		tituloConIcono: {
			alignItems: 'center',
			display: 'flex',
			gap: '10px',
		},
		mensaje: {
			padding: '0 20px 0 32px',
		},
		icon: {
			cursor: 'pointer',
		},
		containerAnchorOriginTopCenter: {
			left: '50% !important',
			position: 'fixed',
			top: '90px !important',
			transform: 'translateX(-50%)',
			width: 'max-content',
			'@media (max-width: 599.95px)': {
				width: 'auto !important',
			},
		},
	})
);

export default useEstilos;
