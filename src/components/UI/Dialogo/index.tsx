import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';

export type Props = {
	titulo?: string;
	mensaje?: string;
	conBotonCancelar?: boolean;
	manejadorClick?: (oprimioBotonAceptar: boolean, data?: any) => void;
	textosBotonesDefault?: {
		aceptar: string;
		cancelar?: string;
	};
	dataCy: string;
	textoInput?: string;
};

const Dialogo = ({
	titulo = '',
	mensaje = '',
	conBotonCancelar = false,
	manejadorClick = () => {},
	textosBotonesDefault,
	dataCy,
	textoInput = undefined,
}: Props) => {
	const {t} = useTranslation();

	const manejarClick = (oprimioBotonAceptar: boolean, data?: any) => {
		manejadorClick(oprimioBotonAceptar, data);
	};

	const [data, setData] = useState({
		textoInput: '',
	});

	const handleChange = (prop: any) => (event: any) => {
		setData({...data, [prop]: event.target.value});
	};

	return (
		<Dialog
			open={true}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			{titulo !== '' && (
				<DialogTitle id='alert-dialog-title'>{titulo}</DialogTitle>
			)}
			<DialogContent>
				{mensaje !== '' && (
					<DialogContentText id='alert-dialog-description' data-cy={dataCy}>
						{mensaje}
					</DialogContentText>
				)}
				{textoInput !== undefined && (
					<TextField
						defaultValue={textoInput}
						onChange={handleChange('textoInput')}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => manejarClick(true, data)} color='primary'>
					{textosBotonesDefault?.aceptar ?? t('general.aceptar')}
				</Button>
				{conBotonCancelar && (
					<Button onClick={() => manejarClick(false)} color='primary'>
						{textosBotonesDefault?.cancelar ?? t('general.cancelar')}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default Dialogo;
