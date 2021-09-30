import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
	interface SimplePaletteColorOptions {
		lighter?: string;
	}
	interface PaletteOptions {
		greys: PaletteColorOptions;
		blues: PaletteColorOptions;
		browns: PaletteColorOptions;
	}
}
