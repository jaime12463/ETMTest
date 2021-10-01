import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles/createPalette' {
	interface SimplePaletteColorOptions {
		lighter?: string;
	}
	interface PaletteOptions {
		greys: PaletteColorOptions;
		browns: PaletteColorOptions;
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
