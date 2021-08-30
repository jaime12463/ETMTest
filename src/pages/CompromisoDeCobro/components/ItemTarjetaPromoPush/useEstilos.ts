import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minWidth: '100%',
		},
		expand: {
			transform: 'rotate(0deg)',
			marginTop: -30,
			marginBottom: -0,
			padding: 0,
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
	})
);

export default useEstilos;
