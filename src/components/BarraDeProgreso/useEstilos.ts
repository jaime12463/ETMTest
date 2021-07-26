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
	},
	label: {
		zIndex: 1,
		position: 'relative',
		top: '23px',
		textAlign: 'center',
	},
	titulo: {
		position: 'relative',
		top: '17px',
	},
}));

export const BorderLinearProgress = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 25,
			width: 100,
		},
		bar: {
			backgroundColor: (props: any) =>
				props.barcolor === 'red'
					? 'rgba(229,57,53,1)'
					: props.barcolor === 'yellow'
					? 'rgba(255,204,128,1)'
					: 'rgba(102, 187, 106, 1)',
		},
		colorPrimary: {
			backgroundColor: '#c4c4c4',
		},
	})
)(LinearProgress);
