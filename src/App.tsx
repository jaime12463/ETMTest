import { AppProvider } from "context/AppContext";
import RoutesWeb from "./components/RoutesWeb";
import { Provider } from 'react-redux';
import { store } from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <RoutesWeb />
      </AppProvider>
    </Provider>
  );
}

export default App;
