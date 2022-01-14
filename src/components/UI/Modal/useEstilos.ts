import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	alerta: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'center',
			background: 'rgba(0, 0, 0, 0.5)',
			display: 'flex',
			height: '100%',
			inset: 0,
			justifyContent: 'center',
			position: 'fixed',
			width: '100%',
			zIndex: 99,
		},
		icon: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: '14px',
		},
		card: {
			background: 'white',
			borderRadius: '8px',
			padding: '28px 16px',
			transform: (props: Props) => (props.alerta ? 'scale(1)' : 'scale(0)'),
			transition: 'all 0.3s ease-in-out',
			width: '340px',
		},
		text: {
			textAlign: 'center',
			width: '100%',
		},
		btnContainer: {
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'space-around',
			width: '100%',
		},
		btnAceptar: {
			background: theme.palette.secondary.main,
			border: 'none',
			borderRadius: '50px',
			color: '#fff',
			cursor: 'pointer',
			padding: '8px 16px',
			minWidth: '130px',
		},
		btnCancelar: {
			opacity: 0.5,
		},
	})
);

export default useEstilos;
