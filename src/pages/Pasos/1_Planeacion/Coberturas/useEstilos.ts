import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		chip: {
			'&.MuiChip-root': {
				background: 'transparent',
				border: `1px solid ${theme.palette.secondary.main}`,
				cursor: 'pointer',
				borderRadius: '50px',
				height: ' 18px',
				padding: '4px, 12px, 4px, 12px',
				width: '178px',
			},
		},
	})
);

export default useEstilos;
