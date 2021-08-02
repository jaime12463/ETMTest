import {makeStyles} from '@material-ui/core/styles';

const useEstilosGenerales = makeStyles((theme) => ({
	cortarTexto: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));

export default useEstilosGenerales;
