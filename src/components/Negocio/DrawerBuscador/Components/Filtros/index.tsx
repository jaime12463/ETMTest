import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import theme from 'theme';
import {BorrarIcon, FlechaArribaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {
	FiltrosBusqueda,
	ItemsBusqueda,
} from 'hooks/useObtenerFiltrosDelCliente';
interface Props {
	filtrosBusqueda: FiltrosBusqueda;
	setFiltrosBusqueda: React.Dispatch<React.SetStateAction<FiltrosBusqueda>>;
	estadoInicialFiltros: FiltrosBusqueda;
	cantidadFiltrosAplicados: number;
}

interface FiltrosExpandidos {
	sabores: boolean;
	marcas: boolean;
	medidas: boolean;
	envases: boolean;
	familias: boolean;
}

const Filtros: React.FC<Props> = ({
	filtrosBusqueda,
	setFiltrosBusqueda,
	estadoInicialFiltros,
	cantidadFiltrosAplicados,
}) => {
	const {t} = useTranslation();

	const [filtrosExpandidos, setFiltrosExpandidos] =
		React.useState<FiltrosExpandidos>({
			sabores: true,
			marcas: true,
			medidas: true,
			envases: true,
			familias: true,
		});

	const filterHandler = (
		tipo: 'envases' | 'familias' | 'sabores' | 'medidas' | 'marcas',
		data: ItemsBusqueda
	) => {
		setFiltrosBusqueda((state) => {
			return {
				...state,
				[tipo]: state[tipo].map((item) => {
					if (item.id === data.id) {
						return {...item, checked: !item.checked};
					}

					return item;
				}),
			};
		});
	};

	const borrarFiltros = () => {
		setFiltrosBusqueda(estadoInicialFiltros);
	};

	return (
		<>
			<Box
				padding='20px 10px 30px 12px'
				height='calc(100% - 50px)'
				sx={{overflowY: 'auto'}}
			>
				<Card variant='outlined' sx={{border: 'none'}}>
					<Box marginBottom='24px'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='24px'
						>
							<Typography
								variant='subtitle2'
								fontFamily='Open Sans'
								fontWeight={700}
								color='#000'
							>
								{t('general.sabores')}
							</Typography>
							<IconButton
								sx={{
									padding: 0,
									transition: 'transform .3s ease-in-out',
									transform: filtrosExpandidos.sabores
										? 'rotateX(0deg)'
										: 'rotateX(180deg)',
								}}
								onClick={() =>
									setFiltrosExpandidos({
										...filtrosExpandidos,
										sabores: !filtrosExpandidos.sabores,
									})
								}
							>
								<FlechaArribaIcon />
							</IconButton>
						</Box>
						<Collapse
							in={filtrosExpandidos.sabores}
							timeout='auto'
							unmountOnExit
						>
							<Box display='flex' gap='16px 8px' flexWrap='wrap'>
								{filtrosBusqueda.sabores?.map((sabor) => {
									return (
										<IconButton
											key={sabor.id}
											sx={{padding: 0}}
											onClick={() => filterHandler('sabores', sabor)}
										>
											<Typography
												border={`1px solid ${theme.palette.secondary.main}`}
												borderRadius='50px'
												color={sabor.checked ? '#fff' : 'secondary'}
												fontFamily='Open Sans'
												padding='4px 12px'
												variant='caption'
												sx={{
													background: sabor.checked
														? theme.palette.secondary.main
														: 'transparent',
												}}
											>
												{sabor.descripcion}
											</Typography>
										</IconButton>
									);
								})}
							</Box>
						</Collapse>
					</Box>
				</Card>
				<Card variant='outlined' sx={{border: 'none'}}>
					<Box marginBottom='24px'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='24px'
						>
							<Typography
								variant='subtitle2'
								fontFamily='Open Sans'
								fontWeight={700}
								color='#000'
							>
								{t('general.familias')}
							</Typography>
							<IconButton
								sx={{
									padding: 0,
									transition: 'transform .3s ease-in-out',
									transform: filtrosExpandidos.familias
										? 'rotateX(0deg)'
										: 'rotateX(180deg)',
								}}
								onClick={() =>
									setFiltrosExpandidos({
										...filtrosExpandidos,
										familias: !filtrosExpandidos.familias,
									})
								}
							>
								<FlechaArribaIcon />
							</IconButton>
						</Box>
						<Collapse
							in={filtrosExpandidos.familias}
							timeout='auto'
							unmountOnExit
						>
							<Box display='flex' gap='16px 8px' flexWrap='wrap'>
								{filtrosBusqueda.familias?.map((familia) => {
									return (
										<IconButton
											sx={{padding: 0}}
											key={familia.id}
											onClick={() => filterHandler('familias', familia)}
										>
											<Typography
												border={`1px solid ${theme.palette.secondary.main}`}
												borderRadius='50px'
												color={familia.checked ? '#fff' : 'secondary'}
												fontFamily='Open Sans'
												padding='4px 12px'
												variant='caption'
												sx={{
													background: familia.checked
														? theme.palette.secondary.main
														: 'transparent',
												}}
											>
												{familia.descripcion}
											</Typography>
										</IconButton>
									);
								})}
							</Box>
						</Collapse>
					</Box>
				</Card>
				<Card variant='outlined' sx={{border: 'none'}}>
					<Box marginBottom='24px'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='24px'
						>
							<Typography
								variant='subtitle2'
								fontFamily='Open Sans'
								fontWeight={700}
								color='#000'
							>
								{t('general.medidas')}
							</Typography>
							<IconButton
								sx={{
									padding: 0,
									transition: 'transform .3s ease-in-out',
									transform: filtrosExpandidos.medidas
										? 'rotateX(0deg)'
										: 'rotateX(180deg)',
								}}
								onClick={() =>
									setFiltrosExpandidos({
										...filtrosExpandidos,
										medidas: !filtrosExpandidos.medidas,
									})
								}
							>
								<FlechaArribaIcon />
							</IconButton>
						</Box>
						<Collapse
							in={filtrosExpandidos.medidas}
							timeout='auto'
							unmountOnExit
						>
							<Box display='flex' gap='16px 8px' flexWrap='wrap'>
								{filtrosBusqueda.medidas?.map((medida) => {
									return (
										<IconButton
											sx={{padding: 0}}
											key={medida.id}
											onClick={() => filterHandler('medidas', medida)}
										>
											<Typography
												border={`1px solid ${theme.palette.secondary.main}`}
												borderRadius='50px'
												color={medida.checked ? '#fff' : 'secondary'}
												fontFamily='Open Sans'
												padding='4px 12px'
												variant='caption'
												sx={{
													background: medida.checked
														? theme.palette.secondary.main
														: 'transparent',
												}}
											>
												{medida.descripcion}
											</Typography>
										</IconButton>
									);
								})}
							</Box>
						</Collapse>
					</Box>
				</Card>
				<Card variant='outlined' sx={{border: 'none'}}>
					<Box marginBottom='24px'>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='24px'
						>
							<Typography
								variant='subtitle2'
								fontFamily='Open Sans'
								fontWeight={700}
								color='#000'
							>
								{t('general.marcas')}
							</Typography>
							<IconButton
								sx={{
									padding: 0,
									transition: 'transform .3s ease-in-out',
									transform: filtrosExpandidos.marcas
										? 'rotateX(0deg)'
										: 'rotateX(180deg)',
								}}
								onClick={() =>
									setFiltrosExpandidos({
										...filtrosExpandidos,
										marcas: !filtrosExpandidos.marcas,
									})
								}
							>
								<FlechaArribaIcon />
							</IconButton>
						</Box>
						<Collapse
							in={filtrosExpandidos.marcas}
							timeout='auto'
							unmountOnExit
						>
							<Box display='flex' gap='16px 8px' flexWrap='wrap'>
								{filtrosBusqueda.marcas?.map((marca) => {
									return (
										<IconButton
											sx={{padding: 0}}
											key={marca.id}
											onClick={() => filterHandler('marcas', marca)}
										>
											<Typography
												border={`1px solid ${theme.palette.secondary.main}`}
												borderRadius='50px'
												color={marca.checked ? '#fff' : 'secondary'}
												fontFamily='Open Sans'
												padding='4px 12px'
												variant='caption'
												sx={{
													background: marca.checked
														? theme.palette.secondary.main
														: 'transparent',
												}}
											>
												{marca.descripcion}
											</Typography>
										</IconButton>
									);
								})}
							</Box>
						</Collapse>
					</Box>
				</Card>
				<Card variant='outlined' sx={{border: 'none'}}>
					<Box>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							marginBottom='24px'
						>
							<Typography
								variant='subtitle2'
								fontFamily='Open Sans'
								fontWeight={700}
								color='#000'
							>
								{t('general.envases')}
							</Typography>
							<IconButton
								sx={{
									padding: 0,
									transition: 'transform .3s ease-in-out',
									transform: filtrosExpandidos.envases
										? 'rotateX(0deg)'
										: 'rotateX(180deg)',
								}}
								onClick={() =>
									setFiltrosExpandidos({
										...filtrosExpandidos,
										envases: !filtrosExpandidos.envases,
									})
								}
							>
								<FlechaArribaIcon />
							</IconButton>
						</Box>
						<Collapse
							in={filtrosExpandidos.envases}
							timeout='auto'
							unmountOnExit
						>
							<Box display='flex' gap='16px 8px' flexWrap='wrap'>
								{filtrosBusqueda.envases?.map((envase) => {
									return (
										<IconButton
											sx={{padding: 0}}
											key={envase.id}
											onClick={() => filterHandler('envases', envase)}
										>
											<Typography
												border={`1px solid ${theme.palette.secondary.main}`}
												borderRadius='50px'
												color={envase.checked ? '#fff' : 'secondary'}
												fontFamily='Open Sans'
												padding='4px 12px'
												variant='caption'
												sx={{
													background: envase.checked
														? theme.palette.secondary.main
														: 'transparent',
												}}
											>
												{envase.descripcion}
											</Typography>
										</IconButton>
									);
								})}
							</Box>
						</Collapse>
					</Box>
				</Card>
			</Box>
			<Box
				alignItems='center'
				display='flex'
				justifyContent='end'
				padding='10px'
				sx={{
					background: '#F5F0EF',
					borderTop: `1px solid ${theme.palette.secondary.dark}`,
				}}
			>
				<IconButton
					sx={{padding: 0}}
					onClick={() => borrarFiltros()}
					disabled={cantidadFiltrosAplicados === 0}
				>
					<Box
						alignItems='center'
						display='flex'
						borderRadius='50px'
						gap='4px'
						padding='8px 16px'
						sx={{
							background: theme.palette.secondary.main,
							opacity: cantidadFiltrosAplicados === 0 ? 0.5 : 1,
						}}
					>
						<BorrarIcon height={13} width={13} fill='#fff' />
						<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
							{t('general.borrarSeleccion')}
						</Typography>
					</Box>
				</IconButton>
			</Box>
		</>
	);
};

export default Filtros;
