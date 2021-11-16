import {forwardRef, useCallback} from 'react';
import {useSnackbar, SnackbarContent, OptionsObject} from 'notistack';
import {AvisoPlantilla} from './AvisosPlantilla';
import React from 'react';



interface Props {
	id: string | number;
	mensaje: string | React.ReactNode;
}

type TData = {
	tipo: 'default' | 'error' | 'success' | 'warning' | 'info';
	titulo: string;
	mensaje: string;
	dataCy?: string;
};


const AvisoContenido = forwardRef<HTMLDivElement, Props>(
	({id, mensaje }, ref) => {
		const {closeSnackbar} = useSnackbar();
		
		const handleDismiss = useCallback(() => {
			closeSnackbar(id);
		}, [id, closeSnackbar]);

		const renderContent= (mensaje: string | React.ReactNode) => {

			if ( typeof mensaje === 'string')
			{
				const attr= JSON.parse(mensaje);
				return (
					<AvisoPlantilla {...attr}/>
				)
			}else{
				return mensaje;
			}
			
		};

		return (
			<SnackbarContent ref={ref}>
				{   renderContent(mensaje) }
			</SnackbarContent>
		);
	}
);

export default AvisoContenido;
