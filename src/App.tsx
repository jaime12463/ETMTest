import Rutas from "components/Rutas";
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f33737"
    },
    secondary: {
      main: "#f33737"
    }
  }
});
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Rutas />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
