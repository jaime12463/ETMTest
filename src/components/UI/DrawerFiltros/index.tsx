import {Box} from '@mui/material';
import useEstilos from './useEstilos';

interface Props {
	open: boolean;
}

export const DrawerFiltros: React.FC<Props> = ({open, children}) => {
	const classes = useEstilos();

	return (
		<Box
			height={`calc(100% - 114px)`}
			position='absolute'
			sx={{
				background: '#fff',
				transform: open ? 'translateX(0)' : 'translateX(200%)',
				transition: 'transform 650ms cubic-bezier(0.44,-0.04, 0.51, 0.88)',
			}}
			top='114px'
			width='100%'
			zIndex={100}
		>
			<Box className={classes.content}>{children}</Box>
		</Box>
	);
};
