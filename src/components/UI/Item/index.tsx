import {ListItem} from '@material-ui/core';

type Props<T> = {
	item: T;
	ItemComponent: React.FC<{item: T}>;
	onClick?: (item: T) => void;
};

function Item<T>(props: Props<T>) {
	const {item, ItemComponent, onClick} = props;

	return (
		<ListItem button disableGutters={true} onClick={()=>{if (onClick) onClick(item)}}>
			{<ItemComponent item={item} />}
		</ListItem>
	);
}

export default Item;
