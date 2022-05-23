import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	direccionFlechaHorizontal: string;
	colorScheme: 'secondary' | 'warning';
}

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
			background: ({colorScheme}: Props) => {
				if (colorScheme === 'warning') {
					return '#FFFBEF';
				}

				if (colorScheme === 'secondary') {
					return '#F5F0EF';
				}
			},
			border: ({colorScheme}: Props) => {
				if (colorScheme === 'warning') {
					return `1.5px solid ${theme.palette.warning.main}`;
				}

				if (colorScheme === 'secondary') {
					return `1.5px solid ${theme.palette.secondary.main}`;
				}
			},
			borderRadius: '10px',
			display: 'flex',
			position: 'absolute',
			zIndex: 10,
			'&::before': {
				content: "''",
				position: 'absolute',
				left: ({direccionFlechaHorizontal}: Props) => direccionFlechaHorizontal,
				top: '-10px',
				width: '0',
				height: '0',
				borderLeft: '6px solid transparent',
				borderRight: '6px solid transparent',
				borderBottom: ({colorScheme}: Props) => {
					if (colorScheme === 'warning') {
						return `9px solid ${theme.palette.warning.main}`;
					}

					if (colorScheme === 'secondary') {
						return `9px solid ${theme.palette.secondary.main}`;
					}
				},
			},
		},
	})
);

export default useEstilos;
