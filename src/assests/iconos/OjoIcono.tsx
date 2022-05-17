import React from 'react';

export const OjoIcon: React.VFC<React.SVGProps<SVGSVGElement>> = ({
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
			<g clipPath='url(#a)'>
				<path
					d='M7 3.36C2.735 3.36.5 6.501.5 7c0 .498 2.235 3.64 6.5 3.64 4.264 0 6.5-3.142 6.5-3.64 0-.499-2.236-3.64-6.5-3.64ZM7 9.8C5.404 9.8 4.11 8.547 4.11 7c0-1.546 1.294-2.8 2.89-2.8S9.889 5.454 9.889 7c0 1.547-1.293 2.8-2.889 2.8ZM7 7c-.265-.29.431-1.4 0-1.4-.798 0-1.445.628-1.445 1.4 0 .773.647 1.4 1.445 1.4S8.445 7.773 8.445 7c0-.355-1.22.247-1.445 0Z'
					fill='#000'
				/>
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='#fff' transform='translate(.5 .5)' d='M0 0h13v13H0z' />
				</clipPath>
			</defs>
		</svg>
	);
};
