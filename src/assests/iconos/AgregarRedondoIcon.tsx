import React from 'react';
import theme from 'theme';

interface Props extends React.SVGProps<SVGSVGElement> {
	disabled?: boolean;
}

export const AgregarRedondoIcon: React.VFC<Props> = ({
	disabled = false,
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
			<rect
				width={24}
				height={24}
				rx={12}
				fill={disabled ? '#D9D9D9' : theme.palette.secondary.dark}
			/>
			<path
				d='M12.75 11.25V6H11.25V11.25H6V12.75H11.25V18H12.75V12.75H18V11.25H12.75Z'
				fill={disabled ? '#00000050' : '#fff'}
			/>
		</svg>
	);
};
