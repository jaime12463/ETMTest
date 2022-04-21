import {makeStyles, createStyles} from '@material-ui/styles';

interface Props {
	position: string;
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
		'@keyframes animationStart': {
			'0%': {
				transform: 'translateY(150vh)',
			},
			'100%': {
				transform: 'translateY(0)',
			},
		},
		card: {
			alignItems: 'center',
			animation: `$animationStart 0.5s cubic-bezier(0.35, 0.34, 0.46, 1.01)`,
			display: 'flex',
			flexDirection: 'column',
			position: 'absolute',
			top: ({position}: Props) => position,
			width: '340px',
		},
	})
);

export default useEstilos;
