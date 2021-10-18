import {makeStyles} from '@material-ui/styles';

export interface SwitchProps {
  content: boolean
}

const useEstilos = makeStyles(() => ({  
  track: {
    backgroundColor: "#FF0000",
    opacity: "1",
    "&:after, &:before": {
      color: "white",
      fontFamily: 'Open Sans',
      fontSize: "10px",
      position: "absolute",
      top: "6px"
    },
    "&:before": {
      content: (props: SwitchProps) => props.content ? "'Crédito'" : "'Contado'",
      right: (props: SwitchProps) => props.content ? "22px" : '12px',
      top: "1px",
    }
  },
}));

export default useEstilos;
