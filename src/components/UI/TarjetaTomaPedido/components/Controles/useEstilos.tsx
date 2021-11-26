import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

interface Props {
	bordeError: boolean;
	unidades: number;
	subUnidades: number;
}

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: 'white',
			border: (props: Props) =>
				props.bordeError && props.unidades === 0 && props.subUnidades === 0
					? `1px solid ${theme.palette.primary.main}`
					: '1px solid #2F000E',
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) =>
					props.bordeError && props.unidades === 0 && props.subUnidades === 0
						? `${theme.palette.primary.main}`
						: '#000',
				fontSize: '12px',
				fontWeight: 600,
			},
			height: '16px',
			lineHeight: '16px',
			padding: '0 2px',
			width: '42px',
		},
	})
);

export default useEstilos;
