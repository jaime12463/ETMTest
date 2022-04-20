import React from 'react';
import {Tab} from '@mui/material';
import {TTab} from 'models';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

interface Props {
	setValue: any;
	tabs: TTab[];
	value: number;
}

export const Tabs: React.VFC<Props> = ({tabs, value, setValue}) => {
	const handleChange = (_: React.SyntheticEvent, newValue: string) => {
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
