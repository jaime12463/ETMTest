import {makeStyles} from '@material-ui/styles';

const useEstilosGenerales = makeStyles((theme) => ({
	cortarTexto: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
}));

export default useEstilosGenerales;
