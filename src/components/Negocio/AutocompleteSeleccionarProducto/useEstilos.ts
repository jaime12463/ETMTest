import {makeStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() => ({
	root: {
		'& .MuiInput-root .MuiInput-input': {
			fontSize: '12px',
		},
	},
	cajaAutocomplete: {
		boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
		borderRadius: '20px',
		border: '100px',
	},
}));

export default useEstilos;
