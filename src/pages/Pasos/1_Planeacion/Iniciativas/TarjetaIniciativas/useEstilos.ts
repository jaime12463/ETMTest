import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	estado: string;
	inputsBloqueados: boolean;
	editarInputs: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		card: {
			border: (props: Props) => {
				switch (props.estado) {
					case 'pendiente':
						return '1px solid #D9D9D9';
					case 'ejecutada':
						return props.editarInputs
							? '1px solid #D9D9D9'
							: `1px solid ${theme.palette.success.main}`;
					case 'cancelada':
						return `1px solid ${theme.palette.primary.main}`;
					default:
						throw new Error('Estado de iniciativa no válido');
				}
			},
			boxSizing: 'border-box',
			borderRadius: '8px',
			minWidth: '304px',
		},
		input: {
			backgroundColor: (props: Props) =>
				props.estado === 'pendiente' ||
				props.estado === 'cancelada' ||
				props.inputsBloqueados
					? '#D9D9D9'
					: '#fff',
			border: (props: Props) => {
				if (
					props.estado === 'pendiente' ||
					props.estado === 'cancelada' ||
					props.inputsBloqueados
				) {
					return 'none';
				}

				if (props.editarInputs) {
					return `1px solid ${theme.palette.primary.main}`;
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) => {
					if (
						props.estado === 'pendiente' ||
						props.estado === 'cancelada' ||
						props.inputsBloqueados
					) {
						return '#00000050';
					}

					if (props.editarInputs) {
						return theme.palette.primary.main;
					}

					return '#000';
				},
				fontSize: '12px',
				fontWeight: 600,
			},
			height: '16px',
			lineHeight: '16px',
			transition: 'all 0.3s ease-in-out',
			width: (props: Props) =>
				props.estado === 'pendiente' ||
				props.estado === 'cancelada' ||
				props.inputsBloqueados
					? '82px'
					: '42px',
		},
		root: {
			width: '100%',
			paddingBottom: 0,
			overflow: 'hidden',
		},
		expand: {
			position: 'relative',
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		cardContent: {
			margin: 0,
			paddingBottom: 0,
			padding: 5,
			'&:last-child': {
				paddingBottom: 0,
			},
		},
		cardContentExpand: {
			paddingTop: 0,
		},
	})
);

export default useEstilos;
