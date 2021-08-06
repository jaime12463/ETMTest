import {ListItem} from '@material-ui/core';

type Props<T> = {
	item: T;
	ItemComponent: React.FC<{item: T; onClickItem?: (item: T) => void}>;
	onClick?: (item: T) => void;
};

function Item<T>(props: Props<T>) {
	const {item, ItemComponent, onClick} = props;

	return (
		<ListItem button disableGutters={true}>
			{<ItemComponent item={item} onClickItem={onClick} />}
		</ListItem>
	);
}

export default Item;
