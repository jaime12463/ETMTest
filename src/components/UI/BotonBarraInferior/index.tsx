import React from 'react';
import {formatearNumero, formatoNumeroConDecimales} from 'utils/methods';
import Button from '@mui/material/Button';
import {Grid} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {
	useObtenerClienteActual,
	useObtenerCompromisoDeCobroActual,
	useObtenerConfiguracion,
} from 'redux/hooks';
import {useObtenerDatosCliente} from 'hooks';

interface Props {
	descripcion: string;
	numeroItems: string;
	onClick: () => void;
	pasoActual: number;
	total: number;
}

export const BotonBarraInferior: React.VFC<Props> = ({
	descripcion,
	numeroItems,
	onClick,
	pasoActual,
	total,
}) => {
	const {t} = useTranslation();
	const compromisoDeCobro = useObtenerCompromisoDeCobroActual();
	const clienteActual = useObtenerClienteActual();
	const {datosCliente} = useObtenerDatosCliente(clienteActual.codigoCliente);
	const configuracion = useObtenerConfiguracion();

	const [botonHabilitado, setbotonHabilitado] = React.useState<boolean>(true);

	const condicionesBloqueo =
		(configuracion.habilitaCompromisoDeCobro &&
			datosCliente?.informacionCrediticia.esCreditoBloqueado &&
			clienteActual.condicion === 'creditoFormal') ||
		(configuracion.habilitaCompromisoDeCobro &&
			datosCliente?.informacionCrediticia.esCreditoBloqueado &&
			datosCliente?.informacionCrediticia.esBloqueadoVenta &&
			clienteActual.condicion === 'creditoInformal');

	React.useEffect(() => {
		if (condicionesBloqueo && pasoActual === 2 && compromisoDeCobro.id === '') {
			setbotonHabilitado(false);
			return;
		}

		setbotonHabilitado(true);
	}, [condicionesBloqueo, pasoActual, compromisoDeCobro.id]);

	return (
		<Button
			variant='contained'
			size='large'
			fullWidth
			style={{borderRadius: '24px', color: 'white', padding: '8px 12px'}}
			onClick={onClick}
			data-cy={`boton-inferior-avanzar`}
			color={botonHabilitado ? 'success' : 'greys'}
			sx={{pointerEvents: botonHabilitado ? 'all' : 'none'}}
		>
			<Grid
				container
				direction='row'
				alignItems='center'
				justifyContent='center'
			>
				<Grid item xs={3}>
					<div
						style={{
							background: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '14px',
							padding: '4px',
							width: '80px',
						}}
					>
						<span
							style={{
								fontSize: '20px',
								fontWeight: 600,
								lineHeight: '24px',
								marginRight: '4px',
							}}
						>
							{numeroItems}
						</span>
						<span
							style={{
								fontSize: '10px',
								fontWeight: 'bold',
								lineHeight: '10px',
							}}
						>
							ITEMS
						</span>
					</div>
				</Grid>
				<Grid
					item
					xs={5}
					style={{
						fontSize:
							formatoNumeroConDecimales(total, t).length >= 7 ? '11px' : '12px',
						fontWeight: 'normal',
						fontFamily: 'Poppins',
						lineHeight: '14px',
						textAlign:
							formatoNumeroConDecimales(total, t).length >= 9
								? 'left'
								: 'center',
						textTransform: 'none',
						paddingLeft: '8px',
					}}
				>
					{descripcion}
				</Grid>
				<Grid
					item
					xs={4}
					style={{fontSize: '20px', fontWeight: 600, lineHeight: '24px'}}
				>
					{formatearNumero(total, t)}
				</Grid>
			</Grid>
		</Button>
	);
};
