import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	botonHabilitado: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'center',
			background: (props: Props) =>
				props.botonHabilitado ? '#FFFFFF' : '#B2B2B2',
			borderRadius: '50px',
			boxShadow: '0px 9px 16px rgba(0, 0, 0, 0.15)',
			cursor: 'pointer',
			display: 'flex',
			gap: '4px',
			height: '32px',
			justifyContent: 'center',
			padding: '8px',
			pointerEvents: (props: Props) => (props.botonHabilitado ? 'all' : 'none'),
			width: '153px',
		},
	})
);

export default useEstilos;
