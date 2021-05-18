import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Routes from "./components/RoutesWeb.jsx";
function App()
{
  return(
    <Layout>
      <BrowserRouter basename={'/'}>
        <Routes/>
      </BrowserRouter>
    </Layout>
  );
}

export default App;