import React from 'react';
import {useTranslation} from 'react-i18next';
import {formatearFechaIntl} from 'utils/methods';
import i18n from 'i18next';

export const Fecha: React.FC = ({children}) => {
	const {t} = useTranslation();
	return <>{formatearFechaIntl(children as string,i18n.language)}</>;
};
