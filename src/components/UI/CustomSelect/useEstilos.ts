import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	open: boolean;
	bloqueado: boolean;
	placeholder: string;
	border?: boolean;
	opcion?: string;
	sinFlecha?: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'center',
			border: (props: Props) =>
				props.border &&
				(props.opcion === props.placeholder ||
					(props.opcion === '' && props.placeholder && !props.bloqueado))
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
			width: '100%',
		},
		dropdown: {
			background: '#fff',
			border: '1px solid #D9D9D9',
			borderRadius: '4px',
			position: 'relative',
			zIndex: 999,
			left: '0',
			top: '22px',
			width: '100%',
		},
		options: {
			zIndex: 999,
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
			marginLeft: '8px',
			opacity: (props: Props) => (props.bloqueado && props.sinFlecha ? 0 : 1),
			transform: (props: Props) =>
				props.open ? 'rotateX(180deg)' : 'rotateX(0deg)',
			transition: 'transform 0.3s ease-in-out',
		},
	})
);

export default useEstilos;
