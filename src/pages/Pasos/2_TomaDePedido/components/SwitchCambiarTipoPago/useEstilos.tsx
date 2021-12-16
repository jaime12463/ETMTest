import {makeStyles} from '@material-ui/styles';

export interface SwitchProps {
	content: boolean;
	texto: string;
}

const useEstilos = makeStyles(() => ({
	track: {
		'&:after, &:before': {
			color: 'white',
			fontFamily: 'Open Sans',
			fontSize: '10px',
			position: 'absolute',
			top: '6px',
		},
		'&:before': {
			content: (props: SwitchProps) =>
				props.content ? `"${props.texto}"` : `"${props.texto}"`,
			right: (props: SwitchProps) => {
				if (props.texto === 'Crédito') {
					return '22px';
				}
				if (props.texto === 'Contado') {
					return '12px';
				}

				if (props.texto === 'Credit') {
					return '27px';
				}
				if (props.texto === 'Cash') {
					return '22px';
				}
				if (props.texto === 'Dinheiro') {
					return '10px';
				}
			},
			top: '1px',
		},
	},
}));

export default useEstilos;
