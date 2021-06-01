import { makeStyles } from "@material-ui/core";
import React from "react";
import ScaffoldContent from "./ScaffoldContent/ScaffoldContent";
import ScaffoldFooter from "./ScaffoldFooter/ScaffoldFooter";
import ScaffoldHeader from "./ScaffoldHeader/ScaffoldHeader";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  }
}));

type Props = {
  children: React.ReactNode;
};

const Scaffold = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>{props.children}</div>
  )
}

Scaffold.Content = ScaffoldContent;
Scaffold.Footer = ScaffoldFooter;
Scaffold.Header = ScaffoldHeader;

export default Scaffold;
