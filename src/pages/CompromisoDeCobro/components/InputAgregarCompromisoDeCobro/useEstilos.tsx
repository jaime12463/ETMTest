import {makeStyles} from '@material-ui/core';
const useEstilos = makeStyles((theme) => ({
	container: {
		'& input': {
			height: 5,
		},
	},
}));
export default useEstilos;
