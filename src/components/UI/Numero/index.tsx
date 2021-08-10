import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles( {
    numero:{
        display: 'flex',
        paddingLeft: '8',
        paddingRight: '8',
        justifyContent: 'flex-end'
      },
});

type Props = {
	tipo: string;
	valor: number;
    decimales:number;
};

function Numero(props: Props) {
    const {t} = useTranslation();
	const {tipo, valor, decimales} = props;
    const classes = useStyles();
	return (
		<div className={classes.numero}>
			{`${(tipo=='moneda' ? t('general.signoMoneda') : '')} ${valor.toFixed(decimales)}`}
		</div>
	);
}

export default Numero;
