import {makeStyles, createStyles} from '@material-ui/styles';

interface Props {
	valid: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			background: '#F5F0EF',
			fontSize: '14px',
			borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
			'& .MuiFilledInput-root.Mui-focused': {
				backgroundColor: '#F5F0EF',
			},
			'& .MuiFilledInput-root': {
				borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
				color: '#000',
			},
			'& .MuiFilledInput-input': {
				fontFamily: 'Open Sans',
				fontSize: '14px',
				borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
				background: '#F5F0EF',
			},
			'& .MuiFormLabel-root': {
				color: '#8A4C5F',
				fontSize: '14px',
			},
			'& label.Mui-focused': {
				color: '#8A4C5F',
				left: '2px',
			},
			'& .MuiFilledInput-root:after': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid ? 'none' : "''"),
			},
			'& .MuiFilledInput-root:before': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid ? 'none' : ''),
			},
			'& .MuiInputBase-root-MuiFilledInput-root.Mui-focused': {
				backgroundColor: 'none',
			},
			'& .MuiInputBase-root-MuiFilledInput-root': {
				backgroundColor: 'none',
			},
			'& .MuiInputBase-root-MuiFilledInput-root:hover': {
				backgroundColor: 'none',
			},
		},
	})
);

export default useEstilos;
