import {FunctionComponent} from 'react';
import Box from '@material-ui/core/Box';

type Props = {
	index: number;
	value: number;
};

const TabPanel: FunctionComponent<Props> = (props) => {
	const {children, value, index, ...other} = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
