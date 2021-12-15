import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	errorAplicacionTotal: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: (props: Props) =>
				props.errorAplicacionTotal
					? `1px solid ${theme.palette.primary.main}`
					: `1px solid ${theme.palette.secondary.main}`,
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) =>
					props.errorAplicacionTotal ? theme.palette.primary.main : '#000',
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
