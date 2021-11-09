import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	open: boolean;
	bloqueado: boolean;
	border?: boolean;
	opcion?: string;
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'center',
			border: (props: Props) =>
				props.border && props.opcion === ''
					? `1px solid ${theme.palette.primary.main}`
					: '1px solid #D9D9D9',
			borderRadius: '4px',
			cursor: 'pointer',
			display: 'flex',
			height: '24px',
			justifyContent: 'space-between',
			padding: '8px',
			pointerEvents: (props: Props) => (props.bloqueado ? 'none' : 'auto'),
			position: 'relative',
			width: '196px',
		},
		dropdown: {
			background: '#fff',
			border: '1px solid #D9D9D9',
			borderRadius: '4px',
			position: 'absolute',
			left: '0',
			top: '25px',
			width: '196px',
			zIndex: 1,
		},
		options: {
			borderBottom: '1px solid #D9D9D9',
			padding: '8px',
			'&:last-child': {
				borderBottom: 'none',
			},
			'&:hover': {
				background: '#F5F5F5',
			},
		},
		arrow: {
			transform: (props: Props) =>
				props.open ? 'rotate(180deg)' : 'rotate(0deg)',
			transition: 'transform 0.2s',
		},
	})
);

export default useEstilos;
