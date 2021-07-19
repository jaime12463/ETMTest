import {Box, Container} from '@material-ui/core';
import useEstilos from './useEstilos';

export type Props = {
	children: React.ReactNode;
};

const PieDePagina = ({children}: Props) => {
	const estilos = useEstilos();
    return (
        <footer className={estilos.footer}>
            <Container maxWidth="xs" disableGutters={true}>
                <div>
                    {children}
                </div>
            </Container>
        </footer>
    )
}

export default PieDePagina
