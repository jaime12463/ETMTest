import Rutas from 'components/UI/Rutas';
import {Provider} from 'react-redux';
import {store} from 'redux/store';
import {ThemeProvider} from '@mui/material/styles';
import theme from 'theme';
import GlobalStyles from './theme/estilosGlobales';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Rutas />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
