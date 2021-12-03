import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: `1px solid ${theme.palette.secondary.main}`,
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: '#000',
				fontSize: '12px',
				fontWeight: 600,
			},
			height: '16px',
			lineHeight: '16px',
			transition: 'all 0.3s ease-in-out',
			width: '42px',
		},
	})
);

export default useEstilos;
