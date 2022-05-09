import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	editarInputs: boolean;
	estado: string;
	iniciativaAbierta: boolean;
	inputsBloqueados: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		card: {
			border: ({estado, editarInputs, iniciativaAbierta}: Props) => {
				switch (estado) {
					case 'pendiente':
						if (iniciativaAbierta) {
							return `1px solid ${theme.palette.primary.main}`;
						}
						return '1px solid #D9D9D9';
					case 'ejecutada':
						return editarInputs
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
			backgroundColor: ({estado, inputsBloqueados}: Props) =>
				estado === 'pendiente' || estado === 'cancelada' || inputsBloqueados
					? '#D9D9D9'
					: '#fff',
			border: ({estado, inputsBloqueados, editarInputs}: Props) => {
				if (
					estado === 'pendiente' ||
					estado === 'cancelada' ||
					inputsBloqueados
				) {
					return 'none';
				}

				if (editarInputs) {
					return `1px solid ${theme.palette.primary.main}`;
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: ({estado, inputsBloqueados, editarInputs}: Props) => {
					if (
						estado === 'pendiente' ||
						estado === 'cancelada' ||
						inputsBloqueados
					) {
						return 'rgba(0, 0, 0, 0.50)';
					}

					if (editarInputs) {
						return theme.palette.primary.main;
					}

					return '#000';
				},
				fontFamily: 'Open Sans',
				fontSize: '12px',
				fontWeight: 600,
				lineHeight: '16px',
			},
			height: '16px',
			transition: 'all 0.3s ease-in-out',
			width: ({estado, inputsBloqueados}: Props) =>
				estado === 'pendiente' || estado === 'cancelada' || inputsBloqueados
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
