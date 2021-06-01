import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

type Props = {};

const ScaffoldHeaderBackAction: FunctionComponent<Props> = () => {
  const history = useHistory();
  return (
    <IconButton size="small" onClick={() => history.goBack()}>
      <ArrowBackIcon style={{ color: "white" }} />
    </IconButton>
  );
};

export default ScaffoldHeaderBackAction;
