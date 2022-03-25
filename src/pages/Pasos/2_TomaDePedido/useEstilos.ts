import {makeStyles, createStyles} from '@material-ui/styles';
import theme from 'theme';

const useEstilos = makeStyles(() =>
	createStyles({
		root: {
			'&.MuiButton-root': {
				background: theme.palette.secondary.main,
				borderRadius: '50px',
				color: '#fff',
				fontFamily: 'Open Sans, Poppins',
				fontSize: '12px',
				fontWeight: '600',
				height: '32px',
				textTransform: 'inherit',
				width: '137px',
				'&:hover': {
					background: theme.palette.secondary.main,
					color: '#fff',
				},
			},
			'&.MuiTypography-root': {
				fontFamily: 'Open Sans, Poppins',
				fontSize: '12px',
			},
			'&.MuiChip-root': {
				background: 'transparent',
				border: `1px solid ${theme.palette.secondary.main}`,
				cursor: 'pointer',
				borderRadius: '50px',
				height: ' 18px',
				padding: '4px, 12px, 4px, 12px',
			},
		},
	})
);

export default useEstilos;
