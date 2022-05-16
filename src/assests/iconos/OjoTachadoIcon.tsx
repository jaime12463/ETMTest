import React from 'react';

export const OjoTachadoIcon: React.VFC<React.SVGProps<SVGSVGElement>> = ({
	...props
}) => {
	return (
		<svg
			width={13}
			height={14}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M6.5 3.36C2.235 3.36 0 6.5 0 7c0 .498 2.235 3.64 6.5 3.64 4.264 0 6.5-3.142 6.5-3.64 0-.5-2.236-3.64-6.5-3.64Zm0 6.44C4.904 9.8 3.61 8.546 3.61 7c0-1.546 1.294-2.8 2.89-2.8S9.389 5.453 9.389 7c0 1.546-1.293 2.8-2.889 2.8Zm0-2.8c-.265-.29.431-1.4 0-1.4-.798 0-1.445.627-1.445 1.4 0 .773.647 1.4 1.445 1.4S7.945 7.773 7.945 7c0-.356-1.22.246-1.445 0Z'
				fill='#fff'
			/>
			<circle cx={6.5} cy={7} r={2} fill='#B2B2B2' />
			<path
				d='M1.5 12 11 2.5'
				stroke='#B2B2B2'
				strokeWidth={2}
				strokeLinecap='round'
			/>
			<path d='M1.5 12 11 2.5' stroke='#fff' strokeLinecap='round' />
		</svg>
	);
};
