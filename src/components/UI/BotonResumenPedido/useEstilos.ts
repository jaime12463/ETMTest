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
				props.botonHabilitado
					? theme.palette.secondary.main
					: theme.palette.secondary.light,
			borderRadius: '50px',
			cursor: 'pointer',
			display: 'flex',
			justifyContent: 'center',
			marginBottom: '12px',
			padding: '4px 0',
			pointerEvents: (props: Props) => (props.botonHabilitado ? 'all' : 'none'),
		},
	})
);

export default useEstilos;
