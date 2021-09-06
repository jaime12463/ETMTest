import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {formatearNumero} from 'utils/methods';

const useStyles = makeStyles({
	numero: {
		display: 'flex',
		paddingLeft: '8',
		paddingRight: '8',
		justifyContent: 'flex-end',
	},
});

type Props = {
	valor: number;
};

function Numero(props: Props) {
	const {t} = useTranslation();
	const classes = useStyles();
	const {valor} = props;
	return <div className={classes.numero}>{formatearNumero(valor, t)}</div>;
}

export default Numero;
