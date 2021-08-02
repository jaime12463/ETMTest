import {ListItem} from '@material-ui/core';

type Props<T> = {
	item: T;
	ItemComponent: React.FC<{item: T}>;
};

function Item<T>(props: Props<T>) {
	const {item, ItemComponent} = props;

	return (
		<ListItem button disableGutters={true}>
			{<ItemComponent item={item} />}
		</ListItem>
	);
}

export default Item;
