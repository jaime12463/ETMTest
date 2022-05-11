import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	botonHabilitado: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			width: '153px',
			height: '32px',
			alignItems: 'center',
			background: (props: Props) =>
				props.botonHabilitado
					? theme.palette.secondary.main
					: theme.palette.secondary.light,
			borderRadius: '50px',
			marginBottom: '12px',
			boxShadow: '0px 9px 16px rgba(0, 0, 0, 0.15)',
			cursor: 'pointer',
			display: 'flex',
			justifyContent: 'center',
			padding: '8px 15px',
			pointerEvents: (props: Props) => (props.botonHabilitado ? 'all' : 'none'),
		},
	})
);

export default useEstilos;
