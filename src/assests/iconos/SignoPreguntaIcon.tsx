import React from 'react';
import theme from 'theme';

export const SignoPreguntaIcon: React.VFC<React.SVGProps<SVGSVGElement>> = ({
	...props
}) => {
	return (
		<svg
			width={16}
			height={16}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12Z'
				fill={theme.palette.secondary.dark}
			/>
			<path
				d='M8 12.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0 1.5ZM8.5 4h-.75A2.245 2.245 0 0 0 5.5 6.25v.25h1v-.25A1.25 1.25 0 0 1 7.75 5h.75a1.25 1.25 0 1 1 0 2.5h-1v2.25h1V8.5a2.25 2.25 0 0 0 0-4.5Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
