import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: `1px solid ${theme.palette.secondary.dark}`,
			borderRadius: '10px',
			height: '16px',
			lineHeight: '16px',
			transition: 'all 0.3s ease-in-out',
			width: '42px',
			'& .MuiInput-input': {
				color: '#000',
				fontSize: '12px',
				fontWeight: 600,
			},
		},
		chip: {
			fontFamily: 'Open Sans',
			height: '14px',
			marginRight: '5px',
			padding: '2px, 12px, 2px, 12px',
			width: '72px',
			textAlign: 'center',
		},
	})
);

export default useEstilos;
