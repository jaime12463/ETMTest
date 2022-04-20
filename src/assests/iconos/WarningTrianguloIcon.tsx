import React from 'react';
import theme from 'theme';

export const WarningTrianguloIcon: React.VFC<React.SVGProps<SVGSVGElement>> = ({
	fill = theme.palette.warning.main,
	...props
}) => {
	return (
		<svg
			width={21}
			height={19}
			viewBox='0 0 34 31'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M33.1726 27.9606C34.2699 26.0715 34.2769 23.8199 33.1866 21.9377L22.2415 3.03238C21.1582 1.1293 19.2012 0 17.0066 0C14.8119 0 12.855 1.13627 11.7716 3.02541L0.81253 21.9517C-0.277788 23.8547 -0.270799 26.1203 0.833498 28.0094C1.92382 29.8777 3.87381 31 6.05445 31H27.9167C30.1044 31 32.0683 29.8637 33.1726 27.9606Z'
				fill={fill}
			/>
			<path
				d='M16.9989 22.1806C16.0484 22.1806 15.2516 22.9753 15.2516 23.9233C15.2516 24.8714 16.0484 25.6661 16.9989 25.6661C17.9145 25.6661 18.7462 24.8714 18.7043 23.9651C18.7462 22.9683 17.9564 22.1806 16.9989 22.1806Z'
				fill='#fff'
			/>
			<path
				d='M16.5395 10.2937C15.7077 10.5308 15.1905 11.2836 15.1905 12.1968C15.2325 12.7475 15.2674 13.3052 15.3094 13.8559C15.4282 15.9542 15.547 18.0106 15.6658 20.1089C15.7077 20.8199 16.2599 21.3358 16.9728 21.3358C17.6857 21.3358 18.2448 20.7851 18.2798 20.0671C18.2798 19.6349 18.2798 19.2375 18.3217 18.7984C18.3986 17.4529 18.4825 16.1075 18.5593 14.7621C18.6013 13.8908 18.6782 13.0194 18.7201 12.148C18.7201 11.8343 18.6782 11.5555 18.5593 11.2766C18.2029 10.4959 17.3712 10.0986 16.5395 10.2937Z'
				fill='#fff'
			/>
		</svg>
	);
};
