import {ListItem} from '@mui/material';

type Props<T> = {
	item: T;
	ItemComponent: React.FC<{
		item: T;
		onClickItem?: (item: T) => void;
		estado?: any;
		index: number;
	}>;
	onClick?: (item: T) => void;
	estado?: any;
	index: number;
	dataCY: string;
};

function Item<T>(props: Props<T>) {
	const {item, ItemComponent, onClick, estado, index, dataCY} = props;

	return (
		<ListItem button disableGutters={true} data-cy={dataCY}>
			{
				<ItemComponent
					item={item}
					onClickItem={onClick}
					estado={estado}
					index={index}
				/>
			}
		</ListItem>
	);
}

export default Item;
