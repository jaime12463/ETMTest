import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import {AgregarRedondoIcon, CajaIcon, QuitarRellenoIcon} from 'assests/iconos';
import useEstilos from '../useEstilos';
import theme from 'theme';
import {useAppDispatch} from 'redux/hooks';
import {
	agregarBonificacion,
	eliminarBonificacion,
} from 'redux/features/visitaActual/visitaActualSlice';
import {TPrecioProducto} from 'models';

interface Props {
	contador: number;
	estadoInicial: number;
	incrementar: (cantidad?: number) => void;
	decrementar: (cantidad?: number) => void;
	reiniciar: () => void;
	idBonificacion: number;
	producto: TPrecioProducto;
	unidadMedida: string;
	idGrupo: number;
}

const Controles: React.FC<Props> = ({
	contador,
	estadoInicial,
	incrementar,
	decrementar,
	reiniciar,
	idBonificacion,
	producto,
	unidadMedida,
	idGrupo,
}) => {
	const classes = useEstilos();
	const [cantidad, setCantidad] = React.useState<number>(0);
	const [puedeAgregar, setPuedeAgregar] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (puedeAgregar) {
			if (cantidad === 0) {
				dispatch(
					eliminarBonificacion({codigoProducto: producto.codigoProducto})
				);
				setPuedeAgregar(false);
				return;
			}

			dispatch(
				agregarBonificacion({
					idBonificacion,
					bonificacion: {
						codigoProducto: producto.codigoProducto,
						numeroPedido: '',
						cantidad,
						idGrupo,
						unidadMedida,
					},
				})
			);
			setPuedeAgregar(false);
		}
	}, [puedeAgregar]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	const handleButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
		const {name} = e.currentTarget;

		if (name === '-') {
			incrementar();
			setCantidad((prevCantidad) => {
				if (prevCantidad > 0) return prevCantidad - 1;
				return 0;
			});
			setPuedeAgregar(true);
		}

		if (name === '+') {
			decrementar();
			setCantidad((prevCantidad) => {
				return prevCantidad + 1 > estadoInicial
					? estadoInicial
					: prevCantidad + 1;
			});
			setPuedeAgregar(true);
		}
	};

	return (
		<Box flex='1' padding='19px 14px 8px 0' sx={{background: '#F5F0EF'}}>
			<Box alignItems='center' display='flex' justifyContent='end' gap='2px'>
				<CajaIcon height='18px' width='18px' />
				<IconButton
					sx={{padding: 0}}
					name='-'
					onClick={handleButtons}
					disabled={cantidad === 0}
				>
					<QuitarRellenoIcon
						height='18px'
						width='18px'
						fill={cantidad === 0 ? '#D9D9D9' : theme.palette.secondary.dark}
					/>
				</IconButton>
				<Input
					autoComplete='off'
					className={classes.input}
					value={cantidad}
					onChange={handleChange}
					// onBlur={handleBlur}
					// onKeyPress={handleKeyPress}
					disableUnderline
					name='unidades'
					id='unidades_producto'
					// onClick={() => {
					// 	setInputFocus('unidades');
					// 	setFocusId(producto.codigoProducto);
					// }}
					onFocus={(e) => e.target.select()}
					inputProps={{
						style: {textAlign: 'center'},
						inputMode: 'numeric',
					}}
				/>
				<IconButton
					sx={{padding: '0'}}
					size='small'
					name='+'
					onClick={handleButtons}
					disabled={contador === 0}
				>
					<AgregarRedondoIcon
						width='18px'
						height='18px'
						fill={contador === 0 ? '#D9D9D9' : theme.palette.secondary.dark}
					/>
				</IconButton>
			</Box>
		</Box>
	);
};

export default Controles;
