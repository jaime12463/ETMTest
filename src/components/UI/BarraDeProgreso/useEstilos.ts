import {
	makeStyles,
	createStyles,
	withStyles,
	Theme,
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const useEstilos = makeStyles((theme) => ({
	container: {
		width: 'fit-content',
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

export const BorderLinearProgress = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 20,
			width: 100,
			textAlign: 'center',
			flex: '1 0 auto',
			paddingTop: 4,
			paddingBottom: 4,
			backgroundRepeat: 'no-repeat',
			borderRadius: '3px',
		},
		bar: {
			backgroundImage: (props: any) => props.barcolor,
		},
		colorPrimary: {
			backgroundColor: '#FFFFFF',
		},
	})
)(LinearProgress);
