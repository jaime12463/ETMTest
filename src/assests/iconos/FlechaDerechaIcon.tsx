import React from 'react';
import theme from 'theme';

export const FlechaDerechaIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M16.32 12.48L8.74105 20.16L7.68 19.0848L14.1979 12.48L7.68 5.87519L8.74105 4.79999L16.32 12.48Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
