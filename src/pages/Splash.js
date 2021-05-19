import React , {useContext, useEffect} from "react";
import Box from '@material-ui/core/Box';
import LogoFemsa from '../assests/images/hdpi_logo_client.png'
import AppContext from '../context/AppContext';
  
export default function Splash(){
    const context = useContext(AppContext);
    const handleRedirect = () => {window.location="./TomaDePedidos";};

    console.log("Splash", context)
    useEffect(() => {
        context.setTitle("Bienvenido");
    },[])
    

    return (
            <div style={{ width: '100%', marginTop:"110px" }}>
                <Box display="flex" justifyContent="center">
                        <img src={LogoFemsa} onClick={handleRedirect}></img>
                </Box>
            </div>
    )
}