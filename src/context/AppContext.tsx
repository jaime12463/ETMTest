import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

type TDataContext = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    listaProductosPedido: any[];
    setlistaProductosPedido: Dispatch<SetStateAction<any[]>>
    cliente: {};
    setCliente: Dispatch<SetStateAction<{}>>;
    viewFooter: boolean;
    setViewFooter: Dispatch<SetStateAction<boolean>>;
};

const DefaultValues: TDataContext = {
    title: "",
    setTitle: () => { },
    listaProductosPedido: [],
    cliente: {},
    setCliente: () => { },
    setlistaProductosPedido: () => { },
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
    const [cliente, setCliente] = useState<{}>({});
    const [listaProductosPedido, setlistaProductosPedido] = useState<any[]>([]);
    const [viewFooter, setViewFooter] = useState<boolean>(false);

    const data = {
        title,
        setTitle,
        cliente,
        setCliente,
        listaProductosPedido,
        setlistaProductosPedido,
        viewFooter,
        setViewFooter,
    }

    return (
        <AppContext.Provider value={data}> { children} </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);