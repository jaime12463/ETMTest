import {makeStyles, createStyles} from '@material-ui/styles';

interface Props {
	valid: boolean;
	error: boolean;
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
				color: (props: Props) => (props.error ? '#FF0000' : '#000'),
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
			'& .MuiFilledInput-root::after': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid || props.error ? 'none' : "''"),
			},
			'& .MuiFilledInput-root:before': {
				borderColor: '#8A4C5F',
				content: (props: Props) => (props.valid || props.error ? 'none' : ''),
			},
		},
	})
);

export default useEstilos;
