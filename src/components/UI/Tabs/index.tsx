import {FunctionComponent} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Tabs as TabsMUI, Tab, Grid} from '@material-ui/core';
import {TabPanel} from 'components/UI';
import React from 'react';
import {TTab} from 'models';

type Props = {
	tabs: TTab[];
};

const useStyles = makeStyles((theme: Theme) => ({
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

const Tabs: FunctionComponent<Props> = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

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
				{props.tabs.map((tab, index) => (
					<Tab
						label={tab.label}
						style={{minWidth: '33%', maxWidth: '33%'}}
						key={index}
						{...a11yProps(index)}
					/>
				))}
			</TabsMUI>
			{props.tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={index}>
					{tab.component}
				</TabPanel>
			))}
		</div>
	);
};

export default Tabs;
