import {GlobalStyles as GlobalThemeStyles} from '@mui/material';

const GlobalStyles = () => {
	return (
		<GlobalThemeStyles
			styles={{
				'#root': {
					background: '#F5F0F0',
					overflow: 'hidden',
				},
			}}
		/>
	);
};

export default GlobalStyles;
