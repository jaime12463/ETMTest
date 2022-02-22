import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		inputBuscador: {
			'& .MuiInput-input': {
				'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
					appearance: 'none',
				},
			},
			background: '#fff',
			borderRadius: '20px',
			width: '243px',
		},
		inputCheckbox: {
			accentColor: theme.palette.success.dark,
			height: '14px',
			margin: 0,
			width: '14px',
		},
		buttonContainer: {
			alignItems: 'center',
			display: 'flex',
			gap: '10px',
			position: 'absolute',
			bottom: '16px',
			left: '50%',
			transform: 'translateX(-50%)',
		},
		button: {
			alignItems: 'center',
			background: theme.palette.secondary.main,
			borderRadius: '50px',
			display: 'flex',
			gap: '4px',
			justifyContent: 'center',
			padding: '8px 30px',
			width: '147px',
		},
	})
);

export default useEstilos;
