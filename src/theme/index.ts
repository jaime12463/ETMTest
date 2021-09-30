import {createTheme, Palette} from '@mui/material/styles';

const pxToRem = (value: number) => {
	return `${value / 16}rem`;
};

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
		info: {
			main: '#5594E9',
			light: '#8DC4FF',
			dark: '#0067B6',
		},
		browns: {main: '#FFE5DE', light: '#F5F0EF', dark: '#CCB3AC'},
	},
	typography: {
		fontFamily: ['Poppins', 'Open Sans'].join(','),
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		h1: {
			fontWeight: 600,
			lineHeight: pxToRem(32),
			fontSize: pxToRem(32),
		},
		h2: {
			fontWeight: 400,
			lineHeight: pxToRem(24),
			fontSize: pxToRem(24),
		},
		h3: {
			fontWeight: 400,
			lineHeight: pxToRem(20),
			fontSize: pxToRem(20),
		},
		subtitle1: {
			fontWeight: 600,
			lineHeight: 1.5,
			fontSize: pxToRem(16),
		},
		subtitle2: {
			fontWeight: 600,
			lineHeight: pxToRem(14),
			fontSize: pxToRem(14),
		},
		body1: {
			lineHeight: 1.5,
			fontSize: pxToRem(16),
		},
		body2: {
			lineHeight: 1.5,
			fontSize: pxToRem(14),
		},
		caption: {
			lineHeight: 1.5,
			fontSize: pxToRem(10),
		},
		overline: {
			color: '#FF5A36',
			fontWeight: 600,
			lineHeight: 1.5,
			fontSize: pxToRem(14),
		},
	},
});

export default theme;
