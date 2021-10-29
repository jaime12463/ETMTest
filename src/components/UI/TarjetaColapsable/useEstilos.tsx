import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	valido: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			'&.MuiCard-root': {
				background: '#FFFFFF',
				boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
				border: (props: Props) =>
					props.valido ? `1px solid ${theme.palette.success.main}` : 'none',
				borderRadius: '8px',
				padding: '16px 18px',
			},
		},
		expand: {
			transform: 'rotate(0deg)',
			padding: 0,
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		inactiva: {
			opacity: 0.5,
		},
	})
);

export default useEstilos;
