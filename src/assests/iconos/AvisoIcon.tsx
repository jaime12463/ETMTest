import React from 'react';
import theme from 'theme';

export const AvisoIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
	fill = theme.palette.warning.main,
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
				d='M12 1.5C6.225 1.5 1.5 6.225 1.5 12C1.5 17.775 6.225 22.5 12 22.5C17.775 22.5 22.5 17.775 22.5 12C22.5 6.225 17.775 1.5 12 1.5ZM11.175 6H12.825V14.25H11.175V6ZM12 18.75C11.4 18.75 10.875 18.225 10.875 17.625C10.875 17.025 11.4 16.5 12 16.5C12.6 16.5 13.125 17.025 13.125 17.625C13.125 18.225 12.6 18.75 12 18.75Z'
				fill={fill}
			/>
		</svg>
	);
};
