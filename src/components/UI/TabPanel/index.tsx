import {Box} from '@mui/material';

interface Props {
	index: number;
	value: number;
}

export const TabPanel: React.FC<Props> = ({
	children,
	index,
	value,
	...other
}) => {
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
