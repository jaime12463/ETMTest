import React from 'react';

export const Filter: React.VFC<React.SVGProps<SVGSVGElement>> = ({
	fill = '#fff',
	...props
}) => {
	return (
		<svg
			width={20}
			height={14}
			fill='none'
			viewBox='0 0 20 14'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M3.333 8.167h13.334V5.833H3.333v2.334ZM0 0v2.333h20V0H0Zm7.778 14h4.444v-2.333H7.778V14Z'
				fill={fill}
			/>
		</svg>
	);
};
