import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		button: {
			alignItems: 'center',
			background: theme.palette.secondary.main,
			borderRadius: '50px',
			display: 'flex',
			gap: '4px',
			justifyContent: 'center',
			minHeight: '32px',
			padding: '8px 14px',
			width: '147px',
		},
		buttonContainer: {
			alignItems: 'center',
			background: theme.palette.browns.light,
			borderTop: `1px solid ${theme.palette.secondary.main}`,
			bottom: 0,
			display: 'flex',
			gap: '28px',
			justifyContent: 'flex-end',
			padding: '10px 24px 10px 14px',
			position: 'absolute',
			right: 0,
			width: '100%',
		},
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
	})
);

export default useEstilos;
