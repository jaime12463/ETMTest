import {FunctionComponent} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Tabs as TabsMUI, Tab, Grid} from '@mui/material';
import {TabPanel} from 'components/UI';
import React from 'react';
import {TTab} from 'models';

type Props = {
	tabs: TTab[];
	value: number;
	setValue: any;
};

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
}));

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const Tabs: FunctionComponent<Props> = ({tabs, value, setValue}) => {
	const classes = useStyles();
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};
	return (
		<div className={classes.root}>
			<TabsMUI
				value={value}
				onChange={handleChange}
				indicatorColor='primary'
				textColor='primary'
				variant='fullWidth'
			>
				{tabs.map((tab, index) => (
					<Tab
						label={tab.label}
						style={{maxWidth: '50%', fontSize: '0.85rem'}}
						key={index}
						disabled={tab.deshabilitar}
						{...a11yProps(index)}
					/>
				))}
			</TabsMUI>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={index}>
					{tab.component}
				</TabPanel>
			))}
		</div>
	);
};

export default Tabs;
