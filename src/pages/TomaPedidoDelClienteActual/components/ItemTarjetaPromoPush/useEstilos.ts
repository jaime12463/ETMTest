import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			paddingBottom: 0,
		},
		expand: {
			position: 'relative',
			transform: 'rotate(0deg)',
			top: -30,
			marginLeft: 'auto',
			padding: 0,
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		cardContent: {
			margin: 0,
			paddingBottom: 0,
			padding: 10,
			'&:last-child': {
				paddingBottom: 0,
			},
		},
		cardContentExpand: {
			paddingTop: 0,
		},
	})
);

export default useEstilos;
