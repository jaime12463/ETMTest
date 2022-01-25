import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			backgroundColor: ({tipo}: Props) => {
				switch (tipo) {
					case 'error':
						return '#FFD5D1';
					case 'success':
						return '#E9F9F3';
					case 'warning':
						return '#FFFBEF';
					case 'default':
						return theme.palette.secondary.dark;
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			border: ({tipo}: Props) => {
				switch (tipo) {
					case 'error':
						return `1.5px solid ${theme.palette.primary.main}`;
					case 'success':
						return `1.5px solid ${theme.palette.success.main}`;
					case 'warning':
						return `1.5px solid ${theme.palette.warning.main}`;
					case 'default':
						return `1.5px solid ${theme.palette.common.white}`;
					default:
						throw new Error('Tipo de aviso no soportado');
				}
			},
			borderRadius: '10px',
			display: 'grid',
			gridColumnGap: '10px',
			gridTemplateAreas: `"Icon Titulo Cerrar"
			"Vacio Mensaje Vacio2"`,
			gridTemplateColumns: 'auto 1fr auto',
			gridTemplateRows: 'auto auto',
			padding: '6px 10px 8px 8px',
			alignItems: 'center',
			width: '340px',
		},
		icon: {
			gridArea: 'Icon',
		},
		cerrarIcon: {
			cursor: 'pointer',
			gridArea: 'Cerrar',
		},
		titulo: {
			gridArea: 'Titulo',
		},
		mensaje: {
			gridArea: 'Mensaje',
		},
		containerAnchorOriginTopCenter: {
			left: '50% !important',
			position: 'fixed',
			top: '90px !important',
			transform: 'translateX(-50%)',
			width: 'max-content',
			'@media (max-width: 599.95px)': {
				width: 'auto !important',
			},
		},
	})
);

export default useEstilos;
