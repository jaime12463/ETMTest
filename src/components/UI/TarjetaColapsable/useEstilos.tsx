import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	valido: boolean;
	open: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			'&.MuiCard-root': {
				background: '#FFFFFF',
				boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
				border: (props: Props) =>
					props.valido && !props.open
						? `1px solid ${theme.palette.success.main}`
						: 'none',
				borderRadius: '8px',
				padding: '16px 18px',
			},
		},
		inactiva: {
			opacity: 0.5,
		},
		arrow: {
			transform: (props: Props) =>
				props.open ? 'rotateX(180deg)' : 'rotateX(0deg)',
			transition: 'transform 0.3s ease-in-out',
		},
	})
);

export default useEstilos;
