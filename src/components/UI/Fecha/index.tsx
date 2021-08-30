import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {formatearFecha} from 'utils/methods';

type Props = {
	children: string;
};

export function Fecha(props: Props) {
	const {t} = useTranslation();
	const {children} = props;
	return <Fragment>{formatearFecha(children, t)}</Fragment>;
}
