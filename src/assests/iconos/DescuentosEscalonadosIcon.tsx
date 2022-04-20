import React from 'react';
import theme from 'theme';

export const DescuentosEscalonadosIcon: React.VFC<
	React.SVGProps<SVGSVGElement>
> = ({...props}) => {
	return (
		<svg
			width={24}
			height={24}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M18.039 20.741a.615.615 0 0 1-.402.162H5.563a.615.615 0 0 1-.402-.162A.615.615 0 0 1 5 20.34V5.207c0-.322 0-.724.241-.885.242-.161.564-.322.886-.322h10.866c.322 0 .644.08.885.322.161.241.322.563.322.885V20.34c0 .161-.08.322-.161.402ZM6.127 5.207v14.488h10.866V5.207H6.127Zm9.658 2.415h-8.37v1.207h8.45V7.622h-.08Zm0 2.415h-1.207v1.207h1.207v-1.207Zm-8.37 2.414h4.829v1.207h-4.83v-1.207Zm7.163 0h1.207v1.207h-1.207v-1.207Zm-7.163-2.414h4.829v1.207h-4.83v-1.207Z'
				fill={theme.palette.secondary.main}
			/>
		</svg>
	);
};
