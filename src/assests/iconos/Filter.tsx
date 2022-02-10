import React from 'react';

export const Filter: React.FC<React.SVGProps<SVGSVGElement>> = ({
	fill = '#fff',
	...props
}) => {
	return (
		<svg
			width={31}
			height={31}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7.75 16.792h15.5v-2.584H7.75v2.584ZM3.875 7.75v2.583h23.25V7.75H3.875Zm9.042 15.5h5.166v-2.583h-5.166v2.583Z'
				fill={fill}
			/>
		</svg>
	);
};
