import {ListItem} from '@material-ui/core';

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
};

function Item<T>(props: Props<T>) {
	const {item, ItemComponent, onClick, estado, index} = props;

	return (
		<ListItem button disableGutters={true}>
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
