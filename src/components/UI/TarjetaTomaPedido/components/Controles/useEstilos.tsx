import {makeStyles, createStyles} from '@material-ui/styles';
import produce from 'immer';
import {TProductoPedido} from 'models';
import theme from 'theme';

interface Props {
	bordeError: boolean;
	unidades: number;
	subUnidades: number;
	producto: TProductoPedido;
	cantidadMaximaConfig: number;
}

const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: (props: Props) => {
				if (props.bordeError) {
					if (props.unidades === 0 && props.subUnidades === 0) {
						return `1px solid ${theme.palette.primary.main}`;
					}

					if (props.producto.unidadesDisponibles) {
						if (props.unidades > props.producto.unidadesDisponibles) {
							return `1px solid ${theme.palette.primary.main}`;
						}
					}

					if (props.unidades > props.cantidadMaximaConfig) {
						return `1px solid ${theme.palette.primary.main}`;
					}
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: (props: Props) => {
					if (props.bordeError) {
						if (props.unidades === 0 && props.subUnidades === 0) {
							return theme.palette.primary.main;
						}

						if (props.producto.unidadesDisponibles) {
							if (props.unidades > props.producto.unidadesDisponibles) {
								return theme.palette.primary.main;
							}
						}

						if (props.unidades > props.cantidadMaximaConfig) {
							return theme.palette.primary.main;
						}
					}

					return '#000';
				},
				fontFamily: 'Open Sans',
				fontSize: '12px',
				fontWeight: 600,
				lineHeight: '16px',
			},
			height: '16px',
			width: '42px',
		},
	})
);

export default useEstilos;
