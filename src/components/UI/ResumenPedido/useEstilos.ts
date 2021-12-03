import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	open: boolean;
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
		card: {
			background: '#fff',
			borderRadius: '8px',
			padding: '12px 18px 22px 18px',
			width: '340px',
		},
	})
);

export default useEstilos;
