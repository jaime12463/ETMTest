import {makeStyles, createStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			background: '#F5F0EF',
			fontSize: '14px',
			'& .MuiFormHelperText-root': {
				fontSize: '10px',
				marginTop: '6px',
			},
			'& .MuiFilledInput-input': {
				fontFamily: 'Open Sans',
				fontSize: '14px',
				background: '#F5F0EF',
			},
			'& .MuiFormLabel-root': {
				color: '#8A4C5F',
			},
			'& label.Mui-focused': {
				color: '#8A4C5F',
			},
			'& .MuiFilledInput-root:after': {
				borderColor: '#8A4C5F',
			},
			'& .MuiFilledInput-root:before': {
				borderColor: '#8A4C5F',
			},
		},
	})
);

export default useEstilos;
