import React from 'react';

export const AgregarIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M20 13.2192L20 11.7808H13.2192V5H11.7808V11.7808H5L5 13.2192H11.7808L11.7808 20H13.2192L13.2192 13.2192H20Z'
				fill='#FF0000'
			/>
		</svg>
	);
};
