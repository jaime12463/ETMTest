import React from 'react'
import { InputsKeysFormTomaDePedido, TFormTomaDePedido, TPrecioProducto, TProductoPedido, TTipoPedido } from 'models';
import { useObtenerVisitaActual } from 'redux/hooks';
import { useForm } from 'react-hook-form';
import { useInicializarPreciosProductosDelClienteActual, useObtenerDatosTipoPedido } from 'hooks';
import { TarjetaColapsable, TarjetaDoble } from 'components/UI';
import { AutocompleteSeleccionarProducto } from 'components/Negocio';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AgregarRedondoIcon, BotellaIcon, CajaIcon, QuitarRellenoIcon } from 'assests/iconos';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles'
import Input from '@mui/material/Input'

const InputStyled = styled(Input)(({}) => ({
	borderRadius: '10px',
	border: '1px solid #2F000E',
	height: '22px',
	width: '42px',
	backgroundColor: 'white',
	fontWeight: 600,
	lineHeight: '16px',
	fontSize: '12px',
}));

const TomaPedido: React.FC = () => {
  const [expandido, setExpandido] = React.useState<string | boolean>(false)
	const [preciosProductos, setPreciosProductos] = React.useState<TPrecioProducto[]>([]);
	const [productoActual, setProductoActual] = React.useState<TPrecioProducto | null>(null);
	const [inputFocus, setInputFocus] = React.useState<InputsKeysFormTomaDePedido>('productoABuscar');
	const visitaActual = useObtenerVisitaActual();
	const {Venta} = visitaActual.pedidos
	const defaultValues: TFormTomaDePedido = {
		unidades: '',
		subUnidades: '',
		productoABuscar: '',
		tipoDePedido: visitaActual.tipoPedidoActual.toString(),
		catalogoMotivo: '',
	};
  const {control, handleSubmit, setValue, getValues} = useForm<TFormTomaDePedido>({defaultValues});
  const stateInputFocus = {inputFocus, setInputFocus};
  const hookForm = {control, handleSubmit, setValue, getValues};
  const obtenerDatosTipoPedido = useObtenerDatosTipoPedido();
  const datosTipoPedidoActual: TTipoPedido | undefined = obtenerDatosTipoPedido();
  useInicializarPreciosProductosDelClienteActual(setPreciosProductos);


  

  return (
    <TarjetaColapsable
    id='Toma de pedido'
    titulo={<Typography variant={'subtitle1'}>Toma de pedido</Typography>}
    subTitulo={<Typography variant={'body3'}>Modifica tu pedido con las mejores opciones para tu cliente.</Typography>}
    expandido={expandido}
    setExpandido={setExpandido}
    cantidadItems={Venta.productos.length}
  >
    <AutocompleteSeleccionarProducto
      hookForm={hookForm}
      stateProductoActual={{productoActual, setProductoActual}} 
      statePreciosProductos={{preciosProductos, setPreciosProductos}} 
      stateInputFocus={stateInputFocus} 
    />
    
    {Venta.productos.length > 0 && Venta.productos.map((producto) =>{
      return <TarjetaDoble key={producto.codigoProducto} izquierda={<Izquierda producto={producto} />} derecha={<Derecha producto={producto} />}/>
    })}
  </TarjetaColapsable>
  )
}

interface Props {
	producto: TProductoPedido;
}

const Izquierda: React.FC<Props> = ({producto}) =>{
	console.log(producto)

	return (
		<Grid container direction="column" padding={2}>
			<Grid item>
				<Typography fontSize="12px" fontWeight="600">{producto.codigoProducto}</Typography>
				<Typography fontSize="12px" fontFamily="Poppins" fontWeight="600">{producto.nombreProducto.toUpperCase()}</Typography>
				{/* <Typography fontSize="10px">12 oz | Vidrio | Retornable</Typography> A DEFINIR DE DONDE VIENE ESTA INFO */} 
			</Grid>
			<Grid container direction="row" spacing={0.5} alignItems="center">
				<Grid item>
					<CajaIcon />
				</Grid>
				<Grid item>
					<Typography fontSize="10px">{`x${producto.presentacion}`}</Typography>
				</Grid>
				<Grid item>
					<Typography fontSize="12px" fontWeight="600">{`$${producto.precioConImpuestoUnidad}`}</Typography>
				</Grid>
				<Grid item>
					<BotellaIcon />
				</Grid>
				<Grid item>
					<Typography fontSize="12px" fontWeight="600">{`$${producto.precioConImpuestoSubunidad}`}</Typography>
				</Grid>
			</Grid>
			<Grid>
			</Grid>
		</Grid>
	)
}

const Derecha: React.FC<Props> = ({producto}) =>{
	return (
		<Grid container direction="column" alignItems="center" justifyContent="center" padding={2} height="100%">
			<Grid container direction="row" alignItems="center" >
				<Grid item>
					<CajaIcon />
				</Grid>
				<Grid item>
					<IconButton size="small"><QuitarRellenoIcon width="18px" height="18px" /></IconButton>
				</Grid>
				<Grid item>
					<InputStyled value={producto.unidades} disableUnderline inputProps={{style: {textAlign: 'center'}}} />
				</Grid>
				<Grid item>
					<IconButton size="small"><AgregarRedondoIcon width="18px" height="18px" /></IconButton>
				</Grid>
			</Grid>
			<Grid container direction="row" alignItems="center">
				<Grid item>
					<BotellaIcon />
				</Grid>
				<Grid item>
					<IconButton size="small"><QuitarRellenoIcon width="18px" height="18px" /></IconButton>
				</Grid>
				<Grid item>
					<InputStyled value={producto.subUnidades} disableUnderline inputProps={{style: {textAlign: 'center'}}} />
				</Grid>
				<Grid item>
					<IconButton size="small"><AgregarRedondoIcon width="18px" height="18px" /></IconButton>
				</Grid>
			</Grid>
		</Grid>
	)
}


export default TomaPedido
