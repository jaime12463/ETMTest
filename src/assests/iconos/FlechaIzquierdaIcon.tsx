import React from 'react';
import theme from 'theme';

export const FlechaIzquierdaIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M7.67999 12.48L15.2589 4.79999L16.32 5.87519L9.8021 12.48L16.32 19.0848L15.2589 20.16L7.67999 12.48Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
