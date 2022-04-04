import {makeStyles, createStyles} from '@material-ui/styles';

const useEstilos = makeStyles(() =>
	createStyles({
		paper: {
			'& > ul': {
				padding: '0',
				border: '1px solid #D9D9D9',
				borderRadius: '4px',
				'& > li': {
					borderBottom: '1px solid #D9D9D9',
					padding: '8px',
				},
				'& > li:last-child': {
					borderBottom: 'none',
				},
			},
			'& .MuiMenuItem-root.Mui-selected': {
				backgroundColor: 'transparent',
			},
			'& .MuiMenuItem-root:hover': {
				backgroundColor: '#eee',
			},
			'& .MuiMenuItem-root.Mui-selected:hover': {
				backgroundColor: '#eee',
			},
		},
	})
);

export default useEstilos;
