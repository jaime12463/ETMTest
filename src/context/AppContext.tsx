import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

type TDataContext = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    viewFooter: boolean;
    setViewFooter: Dispatch<SetStateAction<boolean>>;
};

const DefaultValues: TDataContext = {
    title: "",
    setTitle: () => { },
    viewFooter: false,
    setViewFooter: () => { },
};

const AppContext = createContext<TDataContext>(
    DefaultValues
);

type Props = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: Props): JSX.Element => {

    const { t } = useTranslation();
    const [title, setTitle] = useState<string>(t('titulos.bienvenido'));
    const [viewFooter, setViewFooter] = useState<boolean>(false);

    const data = {
        title,
        setTitle,
        viewFooter,
        setViewFooter,
    }

    return (
        <AppContext.Provider value={data}> { children} </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);