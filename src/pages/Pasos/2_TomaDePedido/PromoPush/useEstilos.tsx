import {makeStyles, createStyles} from '@material-ui/styles';
import {Theme} from '@mui/material';

const useEstilos = makeStyles((theme: Theme) =>
	createStyles({
		root: {
      '&.MuiButton-root': {
        background: '#651C32',
        borderRadius: '50px',
        color: '#fff',
        fontFamily: 'Open Sans, Poppins',
        fontSize: '12px',
        fontWeight: '600',
        height: '32px',
        opacity: '0.5',
        textTransform: 'inherit',
        width: '137px',
        '&:hover':{
          background: '#651C32',
          color: '#fff',
        },
			},
      '&.MuiTypography-root':{
        fontFamily: 'Open Sans, Poppins',
        fontSize: '12px',
      },
      '&.MuiChip-root': {
        background: 'transparent',
        border: '1px solid #651C32',
        cursor: 'pointer',
        borderRadius: '50px',
        height:' 18px',
        padding: '4px, 12px, 4px, 12px',
        width: '93px',

      }
    },
	})
);

export default useEstilos;
