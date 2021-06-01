import { Box } from "@material-ui/core";
import React, { FunctionComponent } from "react";

type Props = {
};

const ScaffoldContent: FunctionComponent<Props> = (props) => (
  <Box display="flex" justifyContent="center">
    {props.children}
  </Box>
);

export default ScaffoldContent;
