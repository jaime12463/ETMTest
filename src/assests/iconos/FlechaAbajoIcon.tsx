import React from 'react';
import theme from 'theme';

export const FlechaAbajoIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M12.48 16.32L4.8 8.74105L5.8752 7.67999L12.48 14.1979L19.0848 7.67999L20.16 8.74105L12.48 16.32Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
