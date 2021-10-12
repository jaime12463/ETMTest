import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';
const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'&.MuiCard-root': {
				background: '#FFFFFF',
				boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
				borderRadius: '8px',
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
			opacity: 0.6,
		},
		cardContent: {
			'&.MuiCardContent-root': {
				padding: 0,

				'&.MuiCardContent-root:last-child': {
					padding: 0,
				},
			},
		},
	})
);

export default useEstilos;
