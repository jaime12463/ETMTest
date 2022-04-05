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
			main: '#651C32',
			light: '#8A4C5F',
			contrastText: '#CCA9B9',
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
		fontFamily: [
			'Poppins',
			'Open Sans',
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Helvetica Neue',
			'Arial',
			'sans-serif',
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
		].join(','),
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		h1: {
			fontWeight: 400,
			lineHeight: '32px',
			fontSize: '32px',
		},
		h2: {
			fontWeight: 400,
			lineHeight: '24px',
			fontSize: '24px',
		},
		h3: {
			fontWeight: 400,
			lineHeight: '20px',
			fontSize: '20px',
		},
		subtitle1: {
			fontWeight: 600,
			lineHeight: '16px',
			fontSize: '16px',
		},
		subtitle2: {
			fontWeight: 600,
			lineHeight: '14px',
			fontSize: '14px',
		},
		subtitle3: {
			fontWeight: 600,
			lineHeight: '12px',
			fontSize: '12px',
		},
		body1: {
			lineHeight: '16px',
			fontSize: '16px',
		},
		body2: {
			lineHeight: '14px',
			fontSize: '14px',
		},
		body3: {
			lineHeight: '12px',
			fontSize: '12px',
		},
		caption: {
			lineHeight: 1,
			fontSize: pxToRem(10),
			color: '#565657',
		},
		overline: {
			color: '#FF5A36',
			fontWeight: 600,
			lineHeight: '14px',
			fontSize: '14px',
		},
	},
});

export default theme;
