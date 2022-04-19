import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	valid: boolean;
	error: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			backgroundColor: '#f9f7f6',
			fontSize: '12px',
			borderRadius: ({valid}: Props) => (valid ? '10px' : '0px'),
			'& .MuiInputBase-root, .MuiFilledInput-root:hover': {
				backgroundColor: '#f9f7f6',
			},
			'& .MuiFilledInput-root.Mui-focused': {
				backgroundColor: '#f9f7f6',
			},
			'& .MuiFilledInput-root': {
				borderRadius: ({valid}: Props) => (valid ? '10px' : '0px'),
				color: ({error}: Props) =>
					error ? `${theme.palette.primary.main}` : '#000',
			},
			'& .MuiFilledInput-input': {
				fontFamily: 'Open Sans',
				fontSize: '12px',
				borderRadius: ({valid}: Props) => (valid ? '10px' : '0px'),
				background: '#f9f7f6',
			},
			'& .MuiFilledInput-root::after': {
				borderColor: `${theme.palette.secondary.light}`,
				content: ({valid, error}: Props) => (valid || error ? 'none' : "''"),
			},
			'& .MuiFilledInput-root:before': {
				borderColor: `${theme.palette.secondary.light}`,
				content: ({valid, error}: Props) => (valid || error ? 'none' : ''),
			},
			'& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
				borderBottom: `1px solid ${theme.palette.secondary.light}`,
			},
		},
	})
);

export default useEstilos;
