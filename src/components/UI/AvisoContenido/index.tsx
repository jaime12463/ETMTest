import {  forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import {Card, CardHeader, CardActions,Typography, IconButton} from '@mui/material';

const colorbg :any ={
    "succes":"success.light",
    "error":"primary.light",
    "warning":"warning.light",
    "info":"info.light",
    "default":"greys.light"
};
type TData ={
    tipo:string;
    titulo:string;
    mensaje:string;
}
const AvisoContenido = forwardRef<HTMLDivElement, { id: string | number, message: string }>((props, ref) => {

    const { closeSnackbar } = useSnackbar();
   
    const data:TData =  JSON.parse(props.message);

    const handleDismiss = useCallback(() => {
        closeSnackbar(props.id);
    }, [props.id, closeSnackbar]);


    console.log ('custom', props);
    return (
        <SnackbarContent ref={ref} >
            <Card  sx={{ backgroundColor: colorbg[data.tipo] }}>
            <CardHeader
                action={
                <IconButton aria-label="close"  onClick={handleDismiss}>
                    icono cerrar
                </IconButton>
                }
                title={<Typography variant="body2">{data.titulo}</Typography>}
                subheader={data.mensaje}
            />
                <CardActions>
                  
                </CardActions>
            </Card>
        </SnackbarContent>
    );
});

export default AvisoContenido;