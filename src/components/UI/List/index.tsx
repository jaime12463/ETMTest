import {Box, Grid, List as ListMUI, ListSubheader} from '@material-ui/core';
import {Item} from 'components/UI';
import {THeader} from 'models';
import {Fragment} from 'react';

type Props<T> = {
	items: T[];
	ItemComponent: React.FC<{item: T}>;
	headers?: THeader[];
};

function List<T>(props: Props<T>) {
	const {items, ItemComponent, headers} = props;
	return (
		<ListMUI
			component='div'
			subheader={
				headers ? (
					<ListSubheader component='div' disableGutters={true}>
						<Grid container>
							{headers.map((header, index) => (
								<Grid item xs={header.width} key={index}>
									<Box>{header.component}</Box>
								</Grid>
							))}
						</Grid>
					</ListSubheader>
				) : (
					<Fragment />
				)
			}
		>
			{items.map((item, index) => (
				<Item item={item} ItemComponent={ItemComponent} key={index} />
			))}
		</ListMUI>
	);
}

export default List;
