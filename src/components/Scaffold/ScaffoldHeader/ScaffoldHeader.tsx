import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import ScaffoldHeaderBackAction from "./ScaffoldHeaderBackAction";
import Headers from "assests/images/pop_up_onda.png";

type Props = {
  children?: React.ReactNode;
  title: string;
};

const ScaffoldHeader = ({ title, children }: Props) => (
  <Box display="flex" justifyContent="center">
    <Box
      display="flex"
      style={{
        background: `url(${Headers}) no-repeat`,
        height: "75px",
        width: "430px",
      }}
    >
      <Grid item xs={2} style={{ marginTop: "17px" }}>
        {children}
      </Grid>
      <Grid item xs={8} style={{ textAlign: "center" }}>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "20px", color: "white" }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2}></Grid>
    </Box>
  </Box>
);

ScaffoldHeader.BackAction = ScaffoldHeaderBackAction;

export default ScaffoldHeader;
