import React from 'react';
import theme from 'theme';

export const FlechaArribaIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M12.48 7.67999L20.16 15.2589L19.0848 16.32L12.48 9.8021L5.8752 16.32L4.8 15.2589L12.48 7.67999Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
