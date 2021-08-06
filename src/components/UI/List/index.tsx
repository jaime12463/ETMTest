import {Box, Grid, List as ListMUI, ListSubheader} from '@material-ui/core';
import {Item} from 'components/UI';
import {THeader} from 'models';
import {Fragment} from 'react';

type Props<T> = {
	items: T[];
	ItemComponent: React.FC<{item: T; onClickItem?: (item: T) => void}>;
	headers?: THeader[];
	onClickItem?: (item: T) => void;
};

function List<T>(props: Props<T>) {
	const {items, ItemComponent, headers, onClickItem} = props;
	return (
		<ListMUI
			component='div'
			subheader={
				headers ? (
					<ListSubheader component='div' disableGutters={true}>
						<Grid container justify='center'>
							{headers.map((header, index) => (
								<Grid item xs={header.width} key={index}>
									{header.component}
								</Grid>
							))}
						</Grid>
					</ListSubheader>
				) : (
					<Fragment />
				)
			}
		>
			{items &&
				items.map((item, index) => (
					<Item
						item={item}
						ItemComponent={ItemComponent}
						key={index}
						onClick={onClickItem}
					/>
				))}
		</ListMUI>
	);
}

export default List;
