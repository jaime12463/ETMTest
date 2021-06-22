import Rutas from "components/Rutas";
import { Provider } from 'react-redux';
import { store } from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <Rutas />
    </Provider>
  );
}

export default App;
