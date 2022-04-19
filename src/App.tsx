import Rutas from 'components/UI/Rutas';
import {Provider} from 'react-redux';
import {store} from 'redux/store';
import {makeStyles, ThemeProvider} from '@mui/material/styles';
import theme from 'theme';
import GlobalStyles from './theme/estilosGlobales';
import {SnackbarProvider} from 'notistack';
import AvisoContenido from 'components/UI/AvisoContenido';
import useEstilos from './components/UI/AvisoContenido/useEstilos';
import './globals.css';

const App = () => {
	const classes = useEstilos({tipo: 'default'});

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					anchorOrigin={{vertical: 'top', horizontal: 'center'}}
					classes={{
						containerAnchorOriginTopCenter:
							classes.containerAnchorOriginTopCenter,
					}}
					content={(
						key: string | number,
						message: string | React.ReactNode
					) => <AvisoContenido id={key} mensaje={message} />}
				>
					<GlobalStyles />
					<Rutas />
				</SnackbarProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
