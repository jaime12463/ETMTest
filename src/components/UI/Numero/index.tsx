import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/styles';
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

interface Props {
	dataCy?: string;
	valor: number;
}

export const Numero: React.VFC<Props> = ({valor, dataCy}) => {
	const {t} = useTranslation();
	const classes = useStyles();

	return (
		<Box className={classes.numero} data-cy={dataCy ?? ''}>
			{formatearNumero(valor, t)}
		</Box>
	);
};

export default Numero;
