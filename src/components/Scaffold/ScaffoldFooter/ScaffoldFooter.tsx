import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";
import Footers from "assests/images/hdpi_logo_soft_hasar.png";

type Props = {};

const ScaffoldFooter: FunctionComponent<Props> = (props) => (
  <Box display="flex" justifyContent="center">
    <div
      style={{
        background: `url(${Footers}) no-repeat`,
        height: "75px",
        width: "300px",
        position: "absolute",
        bottom: "0px",
      }}
    ></div>
  </Box>
);
export default ScaffoldFooter;
