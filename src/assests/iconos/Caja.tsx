import React from 'react';
import theme from 'theme';

export const Caja: React.FC<React.SVGProps<SVGSVGElement>> = ({
	fill = theme.palette.secondary.dark,
	...props
}) => {
	return (
		<svg
			width={14}
			height={14}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7.91 1.736a2.45 2.45 0 0 0-1.82 0L2.06 3.35a1.05 1.05 0 0 0-.66.973v5.352a1.05 1.05 0 0 0 .66.976l4.03 1.612a2.45 2.45 0 0 0 1.82 0l4.03-1.612a1.05 1.05 0 0 0 .66-.976V4.323a1.05 1.05 0 0 0-.66-.974L7.91 1.736Zm-1.56.651a1.75 1.75 0 0 1 1.3 0l3.658 1.463-1.595.637-4.308-1.722.945-.378Zm-1.887.754L8.77 4.864 7 5.573 2.692 3.849l1.77-.707V3.14ZM7.35 6.186l4.55-1.82v5.309a.35.35 0 0 1-.22.325l-4.03 1.612a1.838 1.838 0 0 1-.3.09V6.186Zm-.7 0v5.516a1.758 1.758 0 0 1-.3-.09L2.32 10a.35.35 0 0 1-.22-.325V4.367l4.55 1.82v-.001Z'
				fill={fill}
			/>
		</svg>
	);
};
