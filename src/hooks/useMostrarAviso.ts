import { useSnackbar } from 'notistack';



export const  useMostrarAviso = () =>{
    const { enqueueSnackbar } = useSnackbar();

    const mostrarAviso= ( 
         tipo: 'default' | 'error' | 'success' | 'warning' | 'info',
	     titulo: string,
	     mensaje?: string,
    	dataCy?: string) =>{
     
     console.log('mensaje', mensaje);

      return enqueueSnackbar(JSON.stringify({titulo,mensaje,tipo}),{ 
        variant: tipo,
    });
    }      
    return mostrarAviso;
 
}
