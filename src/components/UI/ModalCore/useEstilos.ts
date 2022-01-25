import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	open: boolean;
	borderRadius: boolean;
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
			overflowY: 'scroll',
			position: 'fixed',
			width: '100%',
			zIndex: 9999,
		},
		card: {
			alignItems: 'center',
			background: '#fff',
			borderRadius: ({borderRadius}: Props) => (borderRadius ? '8px' : 0),
			display: 'flex',
			flexDirection: 'column',
			position: 'absolute',
			top: '5vh',
			transform: ({open}: Props) =>
				open ? 'translateY(0)' : 'translateY(150vh)',
			transition: 'all 0.5s cubic-bezier(0.35, 0.34, 0.46, 1.01)',
			width: '340px',
		},
	})
);

export default useEstilos;
