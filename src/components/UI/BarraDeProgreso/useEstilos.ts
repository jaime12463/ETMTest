
import {makeStyles, createStyles, withStyles} from '@mui/styles';
import { LinearProgress} from '@mui/material';
export const useEstilos = makeStyles((theme) => ({
	container: {
		width: '100%',
		paddingRight:'6px',
		paddingLeft:'6px',
		textAlign: 'center',
	},
	label: {
		zIndex: 1,
		position: 'relative',
		top: '18px',
		fontSize: '0.7rem',
		fontWeight: 'bold',
	},
	titulo: {
		position: 'relative',
		top: '17px',
	},
}));

export const BorderLinearProgress = withStyles((theme) =>
	createStyles({
		root: {
			height: 18,
			width: 100,
			textAlign: 'center',
			flex: '1 0 auto',
			paddingTop: 4,
			paddingBottom: 4,
			backgroundRepeat: 'no-repeat',
			borderRadius: '3px',
		},
		bar: {
			backgroundColor: (props: any) =>
				props.barcolor === 'verde'
					? 'rgba(102,187,106,1)'
					: 'rgba(229, 57, 53, 1)',
		},
		colorPrimary: {
			backgroundColor: '#FFFFFF',
		},
	})
)(LinearProgress);