import {makeStyles, createStyles} from '@material-ui/styles';

interface Props {
	inputsBloqueados: boolean;
}

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: (props: Props) =>
				props.inputsBloqueados ? '#D9D9D9' : '#fff',
			border: (props: Props) =>
				props.inputsBloqueados ? 'none' : '1px solid #2F000E',
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) =>
					props.inputsBloqueados ? 'rgba(0, 0, 0, 0.5)' : '#000',
				fontSize: '12px',
				fontWeight: 600,
			},
			height: '16px',
			lineHeight: '16px',
			transition: 'all 0.3s ease-in-out',
			width: (props: Props) => (props.inputsBloqueados ? '82px' : '42px'),
		},
	})
);

export default useEstilos;
