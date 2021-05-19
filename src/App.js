import React from 'react';
import GlobalState from "./context/GlobalState";
import Layout from "./components/Layout.jsx";
import Routes from "./components/RoutesWeb.jsx";
function App()
{
  return(
    <GlobalState>
      <Layout>
          <Routes/>
      </Layout>
    </GlobalState>

  );
}

export default App;
