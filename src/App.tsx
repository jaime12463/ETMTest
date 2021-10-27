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
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				content={(key: string | number, message:string) => (  <AvisoContenido id={key} message={message} /> )}
				>
					<GlobalStyles />
					<Rutas />
				</SnackbarProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
