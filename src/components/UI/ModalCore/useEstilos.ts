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
			background: '#00000050',
			display: 'flex',
			height: '100%',
			justifyContent: 'center',
			left: 0,
			overflowY: 'scroll',
			position: 'fixed',
			top: 0,
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
