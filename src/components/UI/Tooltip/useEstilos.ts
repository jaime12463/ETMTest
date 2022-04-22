import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		'@keyframes animationStart': {
			'0%': {
				opacity: 0,
			},
			'100%': {
				opacity: 1,
			},
		},
		container: {
			animation: `$animationStart 0.5s cubic-bezier(0.35, 0.34, 0.46, 1.01)`,
			background: '#FFFBEF',
			border: `1.5px solid ${theme.palette.warning.main}`,
			borderRadius: '10px',
			bottom: '-40px',
			display: 'flex',
			left: '-235px',
			padding: '8px 20px',
			position: 'absolute',
			width: '304px',
			'&::before': {
				content: "''",
				position: 'absolute',
				left: '240px',
				top: '-10px',
				width: '0',
				height: '0',
				borderLeft: '6px solid transparent',
				borderRight: '6px solid transparent',
				borderBottom: `9px solid ${theme.palette.warning.main}`,
			},
		},
	})
);

export default useEstilos;
