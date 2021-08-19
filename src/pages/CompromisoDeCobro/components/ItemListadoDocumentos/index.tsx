import {FunctionComponent} from 'react';
import {TDocumento} from 'models';
import {Grid} from '@material-ui/core';
import {Center, Numero} from 'components/UI';

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
				<Center>{vencimiento}</Center>
			</Grid>
			<Grid item xs>
				<Center>{<Numero tipo='moneda' valor={monto} decimales={2} />}</Center>
			</Grid>
		</Grid>
	);
};

export default ItemListadoDocumentos;
