import {FunctionComponent} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Tabs as TabsMUI, Tab, Grid} from '@mui/material';
import React from 'react';
import {TTab} from 'models';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

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

const Tabs: FunctionComponent<Props> = ({tabs, value, setValue}) => {
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<>
			<TabContext value={value.toString()}>
				<TabList onChange={handleChange} aria-label='lab API tabs example'>
					{tabs.map((tab, index) => (
						<Tab
							label={tab.label}
							style={{maxWidth: '50%', fontSize: '0.85rem'}}
							key={index}
							value={index.toString()}
							disabled={tab.deshabilitar}
						/>
					))}
				</TabList>
				{tabs.map(
					(tab, index) =>
						value == index && (
							<TabPanel value={value.toString()} key={index}>
								{tab.component}
							</TabPanel>
						)
				)}
			</TabContext>
		</>
	);
};

export default Tabs;
