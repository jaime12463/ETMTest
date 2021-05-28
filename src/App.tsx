import { AppProvider } from "context/AppContext";
import RoutesWeb from "./components/RoutesWeb";

function App() {
  return (
    <AppProvider>
      <RoutesWeb />
    </AppProvider>
  );
}

export default App;
