import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
	interface SimplePaletteColorOptions {
		lighter?: string;
	}

	interface Palette {
		greys: Palette['primary'];
		browns: Palette['primary'];
	}
	interface PaletteOptions {
		greys: PaletteOptions['primary'];
		browns: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		greys: true;
	}
}

declare module '@mui/material/styles/createTypography' {
	interface TypographyOptions {
		subtitle3?: {
			fontWeight: number;
			lineHeight: string;
			fontSize: string;
		};
		body3?: {
			fontWeight?: number;
			lineHeight: string;
			fontSize: string;
		};
	}
}

declare module '@mui/material/Typography/Typography' {
	interface TypographyPropsVariantOverrides {
		subtitle3: true;
		body3: true;
	}
}
