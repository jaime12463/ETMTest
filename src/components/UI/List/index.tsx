import {
	Box,
	Grid,
	List as ListMUI,
	ListSubheader,
	Divider,
} from '@mui/material';
import {Item} from 'components/UI';
import {THeader} from 'models';
import React, {Fragment} from 'react';

type Props<T> = {
	items: T[];
	ItemComponent: React.FC<{item: T; onClickItem?: (item: T) => void}>;
	headers?: THeader[];
	onClickItem?: (item: T) => void;
	estado?: any;
	dataCY: string;
};

function List<T>(props: Props<T>) {
	const {items, ItemComponent, headers, onClickItem, estado, dataCY} = props;
	return (
		<ListMUI
			component='div'
			style={{maxHeight: '450px', overflowY: 'scroll'}}
			subheader={
				headers ? (
					<ListSubheader
						style={{backgroundColor: '#f5f5f5'}}
						component='div'
						disableGutters={true}
					>
						<Grid container>
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
				items.map((item, index) => {
					return (
						<React.Fragment key={index}>
							<Item
								item={item}
								ItemComponent={ItemComponent}
								index={index}
								key={index}
								onClick={onClickItem}
								estado={estado}
								dataCY={`${dataCY}-${index}`}
							/>
						</React.Fragment>
					);
				})}
		</ListMUI>
	);
}

export default List;
