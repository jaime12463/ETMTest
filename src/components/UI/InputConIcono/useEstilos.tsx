import {makeStyles, createStyles} from '@material-ui/styles';

interface Props {
	valid: boolean;
	error: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			background: '#F5F0EF50',
			fontSize: '12px',
			borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
			'& .MuiInputBase-root, .MuiFilledInput-root:hover': {
				backgroundColor: '#F5F0EF50',
			},
			'& .MuiFilledInput-root.Mui-focused': {
				backgroundColor: '#F5F0EF50',
			},
			'& .MuiFilledInput-root': {
				borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
				color: (props: Props) => (props.error ? '#FF0000' : '#000'),
			},
			'& .MuiFilledInput-input': {
				fontFamily: 'Open Sans',
				fontSize: '12px',
				borderRadius: (props: Props) => (props.valid ? '10px' : '0px'),
				background: '#F5F0EF50',
			},
			'& .MuiFormLabel-root': {
				color: '#8A4C5F',
				fontSize: '10px',
				fontFamily: 'Open Sans',
			},
			'& label.Mui-focused': {
				color: '#8A4C5F',
			},
			'& .MuiFilledInput-root::after': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid || props.error ? 'none' : "''"),
			},
			'& .MuiFilledInput-root:before': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid || props.error ? 'none' : ''),
			},
			'& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
				borderBottom: '1px solid #8A4C5F',
			},
		},
	})
);

export default useEstilos;
