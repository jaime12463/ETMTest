import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	errorAplicacionTotal: boolean;
	promocionAplicada: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: (props: Props) =>
				props.promocionAplicada ? '#D9D9D9' : '#fff',
			border: (props: Props) =>
				props.promocionAplicada
					? `none`
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
			width: (props: Props) => (props.promocionAplicada ? '82px' : '42px'),
		},
	})
);

export default useEstilos;
