import {createTheme, Palette} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#FF0000',
			light: '#FF5A36',
			dark: '#C20000',
		},
		secondary: {
			main: '#5B2135',
			light: '#8A4C5F',
			lighter: '#CCA9B9',
			dark: '#2F000E',
		},
		success: {
			main: '#00CF91',
			light: '#60FFC2',
			dark: '#009D63',
		},
		warning: {
			main: '#F7B500',
			light: '#FFE74C',
			dark: '#BF8600',
		},
		common: {
			black: '#000000',
			white: '#FFFFFF',
		},
		greys: {
			main: '#B2B2B2',
			light: '#D9D9D9',
			lighter: '#F2F2F2',
		},
		blues: {
			main: '#5594E9',
			light: '#8DC4FF',
			dark: '#0067B6',
		},
		browns: {main: '#FFE5DE', light: '#F5F0EF', dark: '#CCB3AC'},
	},
	typography: {
		fontFamily: ['Poppins', 'Open Sans'].join(','),
	},
});

export default theme;
