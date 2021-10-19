import {makeStyles} from '@material-ui/styles';

const useEstilos = makeStyles((theme) => ({
	main: {
		flex: 1,
	},
	maxWidthXs: {
		'&.MuiContainer-maxWidthXs': {
			maxWidth: '360px',
		},
	},
}));
export default useEstilos;
