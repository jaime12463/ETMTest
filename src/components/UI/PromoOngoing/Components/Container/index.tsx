import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import theme from 'theme';
import {ReiniciarIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';

export interface ContainerProps {
	tipo?: 'credito' | 'contado' | 'default';
	onClick?: () => void;
	dataCy?: string;
}

export const Container: React.FC<ContainerProps> = ({
	tipo = 'default',
	onClick = () => {},
	dataCy,
	children,
}) => {
	const {t} = useTranslation();

	let titulo =
		'Promociones que no cubren el requisito dentro de la toma del pedido';

	if (tipo === 'credito') {
		titulo = 'Promociones a crédito';
	}

	if (tipo === 'contado') {
		titulo = 'Promociones a contado';
	}

	return (
		<Box
			padding='16px 18px'
			borderRadius='8px'
			boxShadow='0px 0px 6px rgba(0, 0, 0, 0.25)'
		>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				marginBottom='18px'
			>
				<Typography
					variant='subtitle2'
					color='#000'
					marginBottom={tipo !== 'default' ? '8px' : 0}
					data-cy={dataCy}
				>
					{titulo}
				</Typography>
				{tipo !== 'default' && (
					<>
						<Box
							borderRadius='50px'
							display='flex'
							height='fit-content'
							justifyContent='center'
							padding='4px 0'
							sx={{
								background:
									tipo === 'credito'
										? theme.palette.success.dark
										: theme.palette.secondary.dark,
							}}
							width='66px'
							data-cy={`restablecer-${dataCy}`}
						>
							<Typography variant='caption' fontFamily='Open Sans' color='#fff'>
								{tipo === 'credito' ? 'Crédito' : 'Contado'}
							</Typography>
						</Box>
						<IconButton
							onClick={onClick}
							sx={{
								border: `1px solid ${theme.palette.secondary.main}`,
								borderRadius: '50px',
								display: 'flex',
								gap: '4px',
								padding: '4px 12px',
								width: 'fit-content',
								'&:hover': {
									backgroundColor: 'none',
								},
							}}
						>
							<ReiniciarIcon height='10px' width='10px' />
							<Typography
								variant='caption'
								fontFamily='Open Sans'
								color={theme.palette.secondary.main}
							>
								{t('general.restablecerPromociones')}
							</Typography>
						</IconButton>
					</>
				)}
			</Box>
			{children}
		</Box>
	);
};
