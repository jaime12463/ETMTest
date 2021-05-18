import React  from "react";
import Box from '@material-ui/core/Box';
import LogoFemsa from '../assests/images/hdpi_logo_client.png'
import { resolveTypeReferenceDirective } from "typescript";
  
export default function Splash(){

    const handleRedirect = () => {

        window.location="./TomaDePedidos"        

    };
    
    return (
        <div style={{ width: '100%', marginTop:"110px" }}>
           <Box display="flex" justifyContent="center">
                <img src={LogoFemsa} onClick={handleRedirect}></img>
           </Box>
        </div>
    )
}