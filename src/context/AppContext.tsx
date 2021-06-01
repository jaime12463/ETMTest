import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TCliente, TProductoSolicitado } from "models";

type TDataContext = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    listaProductosPedido: TProductoSolicitado[];
    setlistaProductosPedido: Dispatch<SetStateAction<TProductoSolicitado[]>>;
    cliente: TCliente | {};
    setCliente: Dispatch<SetStateAction<TCliente>>;
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
    const [cliente, setCliente] = useState<TCliente | {}>({});
    const [listaProductosPedido, setlistaProductosPedido] = useState<TProductoSolicitado[]>([]);
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