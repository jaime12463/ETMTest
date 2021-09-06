import {FunctionComponent} from 'react';
import {TDocumento} from 'models';
import {Grid} from '@material-ui/core';
import {Center, Fecha, Numero} from 'components/UI';

type Props = {
	item: TDocumento;
};

const ItemListadoDocumentos: FunctionComponent<Props> = (props) => {
	const {item} = props;
	const {monto, vencimiento, numero} = item;

	return (
		<Grid container>
			<Grid item xs>
				<Center>{numero}</Center>
			</Grid>
			<Grid item xs>
				<Center>
					<Fecha>{vencimiento}</Fecha>
				</Center>
			</Grid>
			<Grid item xs>
				<Center>
					<Numero valor={monto} />
				</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoDocumentos;
