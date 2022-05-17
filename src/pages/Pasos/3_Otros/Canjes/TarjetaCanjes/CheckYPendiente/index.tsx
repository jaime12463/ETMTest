import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {GetValueProps, TProductoPedido} from 'models';
import theme from 'theme';
import {CheckRedondoIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';

interface Props {
	catalogoMotivo: any;
	getValues: GetValueProps;
	producto: TProductoPedido;
}

const CheckYPendiente: React.VFC<Props> = ({
	catalogoMotivo,
	getValues,
	producto,
}) => {
	const [mostrarAcciones, setMostrarAcciones] = React.useState<boolean>(false);
	const [pendiente, setPendiente] = React.useState<boolean>(false);

	const {t} = useTranslation();

	React.useEffect(() => {
		if (getValues.unidades > 0 || getValues.subUnidades > 0) {
			if (getValues.catalogoMotivo !== '') {
				setMostrarAcciones(true);
				setPendiente(false);
				return;
			} else {
				setPendiente(true);
				setMostrarAcciones(false);
				return;
			}
		}

		if (getValues.unidades === 0 && getValues.subUnidades === 0) {
			setMostrarAcciones(false);
			setPendiente(false);
			return;
		}

		return () => {
			setMostrarAcciones(false),
				setPendiente(false),
				delete catalogoMotivo[producto.codigoProducto];
		};
	}, [
		getValues.unidades,
		getValues.subUnidades,
		getValues.catalogoMotivo,
		catalogoMotivo,
	]);

	return (
		<Box display='flex'>
			{(pendiente || mostrarAcciones) && (
				<>
					<Box padding='12px 0 0 14px' width='179px' />
					<Box
						borderRadius='0 8px 0 0'
						padding='12px 14px 0 0'
						minWidth='125px'
						sx={{background: '#F5F0EF'}}
					>
						{mostrarAcciones && (
							<Box display='flex' justifyContent='flex-end'>
								<IconButton sx={{padding: '0'}}>
									<CheckRedondoIcon height='17.5px' width='17.5px' />
								</IconButton>
							</Box>
						)}
						{pendiente && (
							<Box display='flex' justifyContent='flex-end'>
								<Typography
									variant='caption'
									fontFamily='Open Sans'
									color='#fff'
									padding='2px 12px'
									sx={{background: theme.palette.primary.main}}
									borderRadius='50px'
								>
									{t('general.sinMotivo')}
								</Typography>
							</Box>
						)}
					</Box>
				</>
			)}
		</Box>
	);
};

export default CheckYPendiente;
