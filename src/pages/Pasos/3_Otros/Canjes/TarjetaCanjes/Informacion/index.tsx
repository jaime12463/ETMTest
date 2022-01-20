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
import {useObtenerDatos} from 'redux/hooks';

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
	const {setInputFocus} = stateInputFocus;
	const itemCatalogoMotivos = useObtenerCatalogoMotivos();
	const {setFocusId} = statefocusId;
	const {catalogoMotivo, setCatalogoMotivo} = stateCatalogo;
	const {envases, medidas} = useObtenerDatos();

	const motivoFiltrado = itemCatalogoMotivos.filter(
		(item) => item.value === producto.catalogoMotivo
	);

	const [motivo, setMotivo] = React.useState<string>(
		motivoFiltrado[0]?.label ?? ''
	);

	const [selectBloqueado, setSelectBloqueado] = React.useState<boolean>(true);

	React.useEffect(() => {
		if (producto.unidades === 0 && producto.subUnidades === 0) {
			setMotivo('');
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
				<Typography
					variant='subtitle3'
					marginBottom={producto.atributos ? 0 : '6px'}
				>
					{producto.nombreProducto.toUpperCase()}
				</Typography>
				{producto.atributos && (
					<Typography
						margin='4px 0 6px 0'
						variant='caption'
						color={theme.palette.secondary.main}
					>
						{`${medidas[producto.atributos?.medida ?? 0].descripcion} | ${
							envases[producto.atributos?.envase ?? 0].descripcion
						}`}
					</Typography>
				)}
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
			<Box position={'relative'}>
				<CustomSelect
					opciones={[...itemCatalogoMotivos.map((item) => item.label)]}
					opcionSeleccionada={motivo}
					setOpcion={setMotivo}
					dataCy={`canje-motivo-value`}
					bloqueado={selectBloqueado}
					border
					sinFlecha
					placeholder={t('general.motivoDelCanje')}
					stateInputFocus={stateInputFocus}
					statefocusId={statefocusId}
					producto={producto}
				/>
			</Box>
		</Box>
	);
};

export default Informacion;
