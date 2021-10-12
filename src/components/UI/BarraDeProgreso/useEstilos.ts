import {styled} from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {makeStyles} from '@material-ui/styles';


export const BorderLinearProgress = styled(LinearProgress)((props) => ({
	height: 18,
	borderRadius: 5,
	backgroundColor: props.theme.palette.greys.main,
	[`& .${linearProgressClasses.bar}`]: {
	  borderRadius: 5,
	  backgroundColor: props.color === 'success' ? props.theme.palette.success : props.theme.palette.primary.main ,
	},
  }));
  

