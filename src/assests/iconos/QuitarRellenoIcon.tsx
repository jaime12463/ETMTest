import React from 'react';
import theme from 'theme';

interface Props extends React.SVGProps<SVGSVGElement> {
	disabled?: boolean;
}

export const QuitarRellenoIcon: React.FC<Props> = ({
	fill,
	disabled = false,
	...props
}) => (
	<svg
		width={24}
		height={24}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<rect
			width={24}
			height={24}
			rx={12}
			fill={fill ? fill : disabled ? '#D9D9D9' : theme.palette.secondary.dark}
		/>
		<path d='M18 11.25H6v1.5h12v-1.5Z' fill={disabled ? '#00000050' : '#fff'} />
	</svg>
);
