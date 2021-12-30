import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	estado: string;
	inputsBloqueados: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		card: {
			border: (props: Props) => {
				switch (props.estado) {
					case 'pendiente':
						return '1.5px solid #D9D9D9';
					case 'ejecutada':
						return `1px solid ${theme.palette.success.main}`;
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
			border: (props: Props) =>
				props.estado === 'pendiente' ||
				props.estado === 'cancelada' ||
				props.inputsBloqueados
					? 'none'
					: '1px solid #2F000E',
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) =>
					props.estado === 'pendiente' ||
					props.estado === 'cancelada' ||
					props.inputsBloqueados
						? 'rgba(0, 0, 0, 0.5)'
						: '#000',
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
