import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

export interface InputPropsEstilos {
	bordeError?: boolean;
	cantidadMaximaConfig: number;
	disabled?: boolean;
	subUnidades?: number;
	unidades: number;
	unidadesDisponibles?: number;
}

export const useEstilos = makeStyles(() =>
	createStyles({
		input: {
			backgroundColor: ({disabled}: InputPropsEstilos) =>
				disabled ? '#D9D9D9' : '#fff',
			border: ({
				bordeError,
				cantidadMaximaConfig,
				disabled,
				subUnidades,
				unidades,
				unidadesDisponibles,
			}: InputPropsEstilos) => {
				if (bordeError) {
					if (unidades === 0 && subUnidades === 0) {
						return `1px solid ${theme.palette.primary.main}`;
					}

					if (unidadesDisponibles) {
						if (unidades > unidadesDisponibles) {
							return `1px solid ${theme.palette.primary.main}`;
						}
					}

					if (unidades > cantidadMaximaConfig) {
						return `1px solid ${theme.palette.primary.main}`;
					}
				}
				if (disabled) {
					return 'none';
				}

				return `1px solid ${theme.palette.secondary.dark}`;
			},
			borderRadius: '10px',
			'& .MuiInput-input': {
				color: ({
					bordeError,
					cantidadMaximaConfig,
					disabled,
					subUnidades,
					unidades,
					unidadesDisponibles,
				}: InputPropsEstilos) => {
					if (bordeError) {
						if (unidades === 0 && subUnidades === 0) {
							return theme.palette.primary.main;
						}

						if (unidadesDisponibles) {
							if (unidades > unidadesDisponibles) {
								return theme.palette.primary.main;
							}
						}

						if (unidades > cantidadMaximaConfig) {
							return theme.palette.primary.main;
						}
					}
					if (disabled) {
						return 'rgba(0, 0, 0, 0.50)';
					}

					return '#000';
				},
				fontFamily: 'Open Sans',
				fontSize: '12px',
				fontWeight: 600,
				height: '16px',
				lineHeight: '16px',
				padding: 0,
				transition: 'all 0.3s ease-in-out',
				width: ({disabled}: InputPropsEstilos) => (disabled ? '82px' : '42px'),
			},
			height: '16px',
			transition: 'all 0.3s ease-in-out',
			pointerEvents: ({disabled}: InputPropsEstilos) =>
				disabled ? 'none' : 'all',
		},
	})
);
