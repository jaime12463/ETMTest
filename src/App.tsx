import Rutas from 'components/UI/Rutas';
import {Provider} from 'react-redux';
import {store} from 'redux/store';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from 'theme';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Rutas />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
