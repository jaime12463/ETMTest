import Rutas from 'components/UI/Rutas';
import {Provider} from 'react-redux';
import {store} from 'redux/store';
import {ThemeProvider} from '@mui/material/styles';
import theme from 'theme';
import GlobalStyles from './theme/estilosGlobales';
import { SnackbarProvider } from 'notistack';
import AvisoContenido from 'components/UI/AvisoContenido';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					content={(key: string | number, message:string | React.ReactNode) => (  <AvisoContenido id={key} mensaje={message} /> )}
				>
					<GlobalStyles />
					<Rutas />
				</SnackbarProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
