import {makeStyles, createStyles} from '@material-ui/styles';
import {TProductoPedido} from 'models';
import theme from 'theme';

export interface EstilosInputProps {
	bordeError: boolean;
	producto: TProductoPedido;
	cantidadMaximaConfig: number;
}

export const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: '#fff',
			border: ({
				bordeError,
				cantidadMaximaConfig,
				producto,
			}: EstilosInputProps) => {
				if (bordeError) {
					if (producto.unidades === 0 && producto.subUnidades === 0) {
						return `1px solid ${theme.palette.primary.main}`;
					}

					if (producto.unidadesDisponibles) {
						if (producto.unidades > producto.unidadesDisponibles) {
							return `1px solid ${theme.palette.primary.main}`;
						}
					}

					if (producto.unidades > cantidadMaximaConfig) {
						return `1px solid ${theme.palette.primary.main}`;
					}
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: ({
					bordeError,
					cantidadMaximaConfig,
					producto,
				}: EstilosInputProps) => {
					if (bordeError) {
						if (producto.unidades === 0 && producto.subUnidades === 0) {
							return theme.palette.primary.main;
						}

						if (producto.unidadesDisponibles) {
							if (producto.unidades > producto.unidadesDisponibles) {
								return theme.palette.primary.main;
							}
						}

						if (producto.unidades > cantidadMaximaConfig) {
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
