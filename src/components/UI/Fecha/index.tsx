import React from 'react';
import {useTranslation} from 'react-i18next';
import {formatearFecha} from 'utils/methods';

export const Fecha: React.FC = ({children}) => {
	const {t} = useTranslation();

	return <>{formatearFecha(children as string, t)}</>;
};
