import React from 'react';

export const useDebounce = (value: string, delay: number = 300) => {
	const [debouncedValue, setDebouncedValue] = React.useState<string>(value);

	React.useEffect(() => {
		const timerID = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerID);
		};
	}, [value, delay]);

	return debouncedValue;
};
