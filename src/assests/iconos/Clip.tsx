import React from 'react';

export const Clip: React.VFC<React.SVGProps<SVGSVGElement>> = ({
	fill = '#000',
	...props
}) => {
	return (
		<svg
			width={20}
			height={20}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M5.40952 11.0056L6.00031 11.6009L11.0142 6.54908C12.3286 5.22466 12.3286 3.06837 11.0142 1.74395C9.69886 0.418684 7.56045 0.418684 6.24516 1.74395L0.813496 7.21676C-0.271165 8.30964 -0.271165 10.087 0.813496 11.1799C1.35499 11.7255 2.06779 12 2.78059 12C3.49339 12 4.20536 11.7264 4.74769 11.1799L9.76153 6.12809C10.1752 5.71132 10.4025 5.1573 10.4025 4.56792C10.4025 3.97854 10.1752 3.42452 9.76069 3.0069C8.93341 2.17335 7.49026 2.17335 6.66298 3.0069L2.06696 7.63775L2.65775 8.23302L7.25377 3.60218C7.76435 3.08773 8.65932 3.08773 9.1699 3.60218C9.4256 3.85982 9.56683 4.2025 9.56683 4.56792C9.56683 4.93333 9.4256 5.27602 9.1699 5.53282L4.15606 10.5846C3.39729 11.3492 2.16305 11.3492 1.40429 10.5846C0.645532 9.82014 0.645532 8.57654 1.40429 7.81203L6.83595 2.33922C7.82535 1.34233 9.43396 1.34233 10.4234 2.33922C11.4128 3.33612 11.4128 4.95691 10.4234 5.9538L5.40952 11.0056Z'
				fill={fill}
			/>
		</svg>
	);
};
