import React from 'react';
import theme from 'theme';

export const CajaIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
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
				d='M7.99984 9.64697C8.00433 9.21013 7.91396 8.77837 7.73618 8.38715C7.5584 7.99592 7.29829 7.65638 6.97719 7.39648V4.95266C6.97886 4.82937 6.9583 4.70694 6.9167 4.59233C6.87509 4.47772 6.81323 4.37321 6.73468 4.28475C6.65613 4.19628 6.56242 4.12562 6.45889 4.07677C6.35535 4.02792 6.24402 4.0018 6.13127 4H4.86873C4.75598 4.0018 4.64468 4.02792 4.54115 4.07677C4.43762 4.12562 4.34387 4.19628 4.26532 4.28475C4.18677 4.37321 4.12495 4.47772 4.08334 4.59233C4.04173 4.70694 4.02118 4.82937 4.02285 4.95266V7.36883C3.70175 7.62874 3.4416 7.96828 3.26382 8.35951C3.08604 8.75073 2.99567 9.18249 3.00016 9.61933V11H7.97457L7.99984 9.64697ZM4.80562 4.98031C4.80496 4.95162 4.8134 4.92357 4.82951 4.90092C4.84562 4.87827 4.86838 4.86246 4.89397 4.85609H6.15651C6.16981 4.8578 6.18271 4.8623 6.19438 4.86949C6.20605 4.87668 6.21629 4.88641 6.22451 4.89797C6.23274 4.90954 6.23877 4.92277 6.24227 4.93691C6.24577 4.95105 6.24666 4.96578 6.24489 4.98031V5.40831H4.83086L4.80562 4.98031ZM7.24231 10.1993H3.8082V9.64697C3.80608 9.3125 3.88282 8.98305 4.03098 8.69043C4.17915 8.39781 4.39376 8.15187 4.65412 7.97633L4.83086 7.85212V6.23676H6.24489V7.85212L6.42167 7.97633C6.68203 8.15187 6.89664 8.39781 7.04481 8.69043C7.19297 8.98305 7.26967 9.3125 7.26755 9.64697L7.24231 10.1993Z'
				fill={theme.palette.secondary.dark}
			/>
			<path
				d='M14.9998 9.64697C15.0043 9.21013 14.914 8.77837 14.7362 8.38715C14.5584 7.99592 14.2983 7.65638 13.9772 7.39648V4.95266C13.9789 4.82937 13.9583 4.70694 13.9167 4.59233C13.8751 4.47772 13.8132 4.37321 13.7347 4.28475C13.6561 4.19628 13.5624 4.12562 13.4589 4.07677C13.3554 4.02792 13.244 4.0018 13.1313 4H11.8687C11.756 4.0018 11.6447 4.02792 11.5412 4.07677C11.4376 4.12562 11.3439 4.19628 11.2653 4.28475C11.1868 4.37321 11.125 4.47772 11.0833 4.59233C11.0417 4.70694 11.0211 4.82937 11.0228 4.95266V7.36883C10.7017 7.62874 10.4416 7.96828 10.2638 8.35951C10.086 8.75073 9.99567 9.18249 10.0002 9.61933V11H14.9746L14.9998 9.64697ZM11.8056 4.98031C11.8039 4.96578 11.8047 4.95105 11.8082 4.93691C11.8117 4.92277 11.8178 4.90954 11.826 4.89797C11.8342 4.88641 11.8445 4.87668 11.8561 4.86949C11.8678 4.8623 11.8807 4.8578 11.894 4.85609H13.1565C13.1821 4.86246 13.2049 4.87827 13.221 4.90092C13.2371 4.92357 13.2455 4.95162 13.2449 4.98031V5.40831H11.8309L11.8056 4.98031ZM14.2423 10.1993H10.783V9.64697C10.7808 9.3125 10.8575 8.98305 11.0057 8.69043C11.1539 8.39781 11.3685 8.15187 11.6288 7.97633L11.8056 7.85212V6.23676H13.2197V7.85212L13.3964 7.97633C13.6568 8.15187 13.8714 8.39781 14.0195 8.69043C14.1677 8.98305 14.2444 9.3125 14.2423 9.64697V10.1993Z'
				fill={theme.palette.secondary.dark}
			/>
			<path
				d='M20.9998 9.64697C21.0043 9.21013 20.9142 8.77837 20.7368 8.38715C20.5595 7.99592 20.3001 7.65638 19.9798 7.39648V4.95266C19.9798 4.70238 19.8899 4.46217 19.7297 4.2839C19.5694 4.10564 19.3516 4.00363 19.1234 4H17.864C17.7515 4.0018 17.6405 4.02792 17.5372 4.07677C17.434 4.12562 17.3405 4.19628 17.2621 4.28475C17.1838 4.37321 17.1221 4.47772 17.0806 4.59233C17.0391 4.70694 17.0186 4.82937 17.0202 4.95266V7.36883C16.6999 7.62874 16.4404 7.96828 16.2631 8.35951C16.0858 8.75073 15.9957 9.18249 16.0002 9.61933V11H20.9621L20.9998 9.64697ZM17.8136 4.98031C17.8119 4.96578 17.8128 4.95105 17.8163 4.93691C17.8198 4.92277 17.8258 4.90954 17.834 4.89797C17.8422 4.88641 17.8524 4.87668 17.864 4.86949C17.8757 4.8623 17.8885 4.8578 17.9018 4.85609H19.1611C19.189 4.8595 19.2147 4.87402 19.2333 4.89696C19.2519 4.91991 19.2621 4.94961 19.2619 4.98031V5.40831H17.8514L17.8136 4.98031ZM20.2442 10.1993H16.7935V9.64697C16.7914 9.3125 16.868 8.98305 17.0157 8.69043C17.1635 8.39781 17.3776 8.15187 17.6373 7.97633L17.8136 7.85212V6.23676H19.2241V7.85212L19.4004 7.97633C19.6601 8.15187 19.8742 8.39781 20.022 8.69043C20.1698 8.98305 20.2463 9.3125 20.2442 9.64697V10.1993Z'
				fill={theme.palette.secondary.dark}
			/>
			<path
				d='M21.9289 11.5H2.07112C1.78705 11.5 1.51459 11.6107 1.31371 11.8077C1.11284 12.0046 1 12.2718 1 12.5504V18.9496C1 19.2282 1.11284 19.4954 1.31371 19.6923C1.51459 19.8893 1.78705 20 2.07112 20H21.9289C22.213 20 22.4854 19.8893 22.6863 19.6923C22.8872 19.4954 23 19.2282 23 18.9496V12.5504C23 12.2718 22.8872 12.0046 22.6863 11.8077C22.4854 11.6107 22.213 11.5 21.9289 11.5V11.5ZM21.9289 18.9496H2.05701V12.5366H21.9289V18.9496Z'
				fill={theme.palette.secondary.dark}
			/>
			<path
				d='M9.88766 17H14.1123C14.613 17 15.0931 16.842 15.4471 16.5607C15.8011 16.2794 16 15.8978 16 15.5C16 15.1022 15.8011 14.7207 15.4471 14.4394C15.0931 14.1581 14.613 14 14.1123 14H9.88766C9.38702 14 8.90688 14.1581 8.55288 14.4394C8.19888 14.7207 8 15.1022 8 15.5C8 15.8978 8.19888 16.2794 8.55288 16.5607C8.90688 16.842 9.38702 17 9.88766 17V17ZM9.88766 14.8929H14.1123C14.2854 14.9205 14.4411 14.9949 14.5529 15.1034C14.6647 15.2119 14.7259 15.3478 14.7259 15.4881C14.7259 15.6283 14.6647 15.7643 14.5529 15.8728C14.4411 15.9813 14.2854 16.0557 14.1123 16.0833H9.88766C9.71461 16.0557 9.55894 15.9813 9.44711 15.8728C9.33527 15.7643 9.27415 15.6283 9.27415 15.4881C9.27415 15.3478 9.33527 15.2119 9.44711 15.1034C9.55894 14.9949 9.71461 14.9205 9.88766 14.8929V14.8929Z'
				fill={theme.palette.secondary.dark}
			/>
		</svg>
	);
};
