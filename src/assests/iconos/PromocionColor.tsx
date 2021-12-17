import React from 'react';
import theme from 'theme';

export const PromocionColor: React.FC<React.SVGProps<SVGSVGElement>> = ({
	...props
}) => {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.36536 6.95212L2.85715 13.8263L12.5933 23.5625L19.9757 16.1801L10.2395 6.44391L3.36536 6.95212ZM8.5 13C9.32843 13 10 12.3284 10 11.5C10 10.6716 9.32843 10 8.5 10C7.67157 10 7 10.6716 7 11.5C7 12.3284 7.67157 13 8.5 13Z'
				fill={theme.palette.primary.main}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M9.38825 6.507L4.89711 6.83903L5.3229 1.07962L12.1971 0.571411L21.9333 10.3076L18.0182 14.2227L10.771 6.97558C11.4701 6.848 12 6.23588 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 5.88757 9.14699 6.2408 9.38825 6.507Z'
				fill={theme.palette.secondary.main}
			/>
		</svg>
	);
};
