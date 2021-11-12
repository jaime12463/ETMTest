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
			height: '100vh',
			justifyContent: 'center',
			left: '0',
			position: 'fixed',
			top: 0,
			width: '100vw',
			zIndex: 1,
		},
		icon: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: '16px',
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
			justifyContent: 'space-evenly',
			width: '100%',
		},
		btnAceptar: {
			background: theme.palette.secondary.main,
			border: 'none',
			borderRadius: '50px',
			color: '#fff',
			cursor: 'pointer',
			padding: '8px 36px',
		},
		btnCancelar: {
			opacity: 0.5,
		},
	})
);

export default useEstilos;
