import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TCondicicon, TProductoPedido, TStateInputFocus} from 'models';
import {StateFocusID} from 'components/UI/TarjetaTomaPedido';
import {useObtenerCatalogoMotivos} from 'pages/Pasos/2_TomaDePedido/hooks';
import {CajaIcon} from 'assests/iconos';
import CustomSelect from 'components/UI/CustomSelect';
import theme from 'theme';
import {useTranslation} from 'react-i18next';
import {GetValueProps} from '..';

interface Props {
	producto: TProductoPedido;
	condicion: TCondicicon;
	stateCatalogo: any;
	stateInputFocus: TStateInputFocus;
	statefocusId: StateFocusID;
	getValues: GetValueProps;
}

const Informacion: React.FC<Props> = ({
	producto,
	condicion,
	stateCatalogo,
	stateInputFocus,
	statefocusId,
	getValues,
}) => {
	const {t} = useTranslation();
	const {inputFocus, setInputFocus} = stateInputFocus;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const {focusId, setFocusId} = statefocusId;
	const {catalogoMotivo, setCatalogoMotivo} = stateCatalogo;
	const [motivo, setMotivo] = React.useState<string>(
		t('general.motivoDelCanje')
	);

	const [selectBloqueado, setSelectBloqueado] = React.useState<boolean>(true);

	React.useEffect(() => {
		if (producto.unidades === 0 && producto.subUnidades === 0) {
			setMotivo(t('general.motivoDelCanje'));
			setSelectBloqueado(true);
			return;
		}
	}, [producto.unidades, producto.subUnidades]);

	React.useEffect(() => {
		if (getValues.unidades > 0 || getValues.subUnidades > 0) {
			return setSelectBloqueado(false);
		}

		return setSelectBloqueado(true);
	}, [getValues.unidades, getValues.subUnidades]);

	React.useEffect(() => {
		const motivoFiltrado = itemCatalogoMotivos.find(
			(item) =>
				item.label === `${motivo.charAt(0).toUpperCase()}${motivo.slice(1)}`
		);

		if (motivoFiltrado) {
			setCatalogoMotivo({
				...catalogoMotivo,
				[producto.codigoProducto]: {codigoMotivo: motivoFiltrado.value},
			});
			setFocusId(0);
			setInputFocus('productoABuscar');
		}
	}, [motivo]);

	return (
		<Box padding='12px 4px 12px 14px' width='179px'>
			<Box display='flex' flexDirection='column'>
				<Typography variant='subtitle3' fontFamily='Open Sans'>
					{producto.codigoProducto}
				</Typography>
				<Typography variant='subtitle3'>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
			</Box>
			<Box display='flex' alignItems='center' marginBottom='12px' gap='2px'>
				<CajaIcon
					height='18px'
					width='18px'
					fill={theme.palette.secondary.dark}
				/>
				<Typography
					variant='caption'
					fontFamily='Open Sans'
				>{`x${producto.presentacion}`}</Typography>
			</Box>
			<Box>
				<CustomSelect
					opciones={[...itemCatalogoMotivos.map((item) => item.label)]}
					opcionSeleccionada={motivo}
					setOpcion={setMotivo}
					dataCy={`canje-motivo-value`}
					bloqueado={selectBloqueado}
					border
					sinFlecha
				/>
			</Box>
		</Box>
	);
};

export default Informacion;
