import React from 'react'
import { TarjetaColapsable } from 'components/UI'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles'
import { ItemTarjetaPromoPush } from 'pages/Pasos/3_Otros/CompromisoDeCobro/components'
import { useObtenerPromoPushDelCliente } from 'hooks'
import useEstilos from './useEstilos'
import { BorrarIcon } from 'assests/iconos'

const TextStyled = styled(Typography)(() => ({
	color: '#651C32',
	fontSize: '10px',
}))

interface BotonProps {
	push: boolean,
	ongoing: boolean
}

const PromoPush: React.FC = () => {
  const [expandido, setExpandido] = React.useState<boolean | string>(false)
	const [promoActiva, setPromoActiva] = React.useState<BotonProps>({push: true, ongoing: false})
  const promociones = useObtenerPromoPushDelCliente()
	const classes = useEstilos()

  return (
    <TarjetaColapsable
			id='Promociones'
			titulo={<Typography variant={'subtitle1'}>Promociones</Typography>}
			subTitulo={
				<Typography variant={'body3'}>
					Selecciona las promociones que tienes disponible para tus clientes.
				</Typography>
			}
			expandido={expandido}
			setExpandido={setExpandido}
			// cantidadItems={venta.productos.length}
		>
			<Grid container justifyContent="space-evenly" paddingBottom={2}>
				<Button 
					sx={promoActiva.push === true ? {opacity: '1'} : {opacity: '0.5'}} 
					className={classes.root}
				>
					Promo push
				</Button>
				<Button 
					sx={promoActiva.ongoing === true ? {opacity: '1'} : {opacity: '0.5'}} 
					className={classes.root}
				>
					Promo ongoing
				</Button>
			</Grid>

			<Grid container justifyContent="space-between" alignItems="center">
				<FormControlLabel control={<Radio color="success" size="small"/>} label={<Typography className={classes.root}>Agregar al pedido</Typography>}/>
				<Chip className={classes.root} size="small" icon={<BorrarIcon width="7.5px" height="7.5px" />} label={<TextStyled>Borrar todo</TextStyled>} />
			</Grid>

      {
        promociones.length > 0 &&
          promociones.map((promocion: any) =>{
            return <ItemTarjetaPromoPush key={promocion.codigoProducto} item={promocion} />
          })
      }
		</TarjetaColapsable>
  )
}

export default PromoPush
