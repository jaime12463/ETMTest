import {useState, useMemo, useEffect} from 'react';
import {Box, Card, Typography, IconButton, Collapse} from '@mui/material';
import theme from 'theme';
import {BorrarIcon, FlechaArribaIcon} from 'assests/iconos';
import {useTranslation} from 'react-i18next';
import {
	FiltrosBusqueda,
	ItemsBusqueda,
} from 'hooks/useObtenerFiltrosDelCliente';
import {TPrecioProducto} from 'models';

interface Props {
	cantidadFiltrosAplicados: number;
	estadoInicialFiltros: FiltrosBusqueda;
	filtrosBusqueda: FiltrosBusqueda;
	restablecerFiltros: () => void;
	resultadosBusqueda: TPrecioProducto[];
	setAbrirFiltros: React.Dispatch<React.SetStateAction<boolean>>;
	setFiltrosBusqueda: React.Dispatch<React.SetStateAction<FiltrosBusqueda>>;
}

interface FiltrosExpandidos {
	sabores: boolean;
	marcas: boolean;
	medidas: boolean;
	envases: boolean;
	familias: boolean;
}

export const Filtros: React.VFC<Props> = ({
	cantidadFiltrosAplicados,
	estadoInicialFiltros,
	filtrosBusqueda,
	restablecerFiltros,
	resultadosBusqueda,
	setAbrirFiltros,
	setFiltrosBusqueda,
}) => {
	const {t} = useTranslation();
	const [filtrosAplicados, setFiltrosAplicados] =
		useState<FiltrosBusqueda>(estadoInicialFiltros);

	const [filtrosExpandidos, setFiltrosExpandidos] = useState<FiltrosExpandidos>(
		{
			sabores: true,
			marcas: true,
			medidas: true,
			envases: true,
			familias: true,
		}
	);

	const cantidadFiltrosSeleccionados = useMemo(
		() =>
			Object.values(filtrosAplicados).reduce(
				(total, arr) =>
					total + arr.filter((item: ItemsBusqueda) => item.checked).length,
				0
			),
		[filtrosAplicados]
	);

	const filterHandler = (
		tipo: 'envases' | 'familias' | 'sabores' | 'medidas' | 'marcas',
		data: ItemsBusqueda
	) => {
		setFiltrosAplicados((state) => {
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

	useEffect(() => {
		setFiltrosAplicados(filtrosBusqueda);
	}, [filtrosBusqueda]);

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
								{filtrosAplicados.sabores?.map((sabor) => {
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
								{filtrosAplicados.familias?.map((familia) => {
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
								{filtrosAplicados.medidas?.map((medida) => {
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
								{filtrosAplicados.marcas?.map((marca) => {
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
								{filtrosAplicados.envases?.map((envase) => {
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
				gap='28px'
				justifyContent='flex-end'
				padding='10px 24px 10px 14px'
				sx={{
					background: theme.palette.browns.light,
					borderTop: `1px solid ${theme.palette.secondary.dark}`,
				}}
			>
				{(cantidadFiltrosAplicados !== 0 ||
					cantidadFiltrosSeleccionados !== 0) && (
					<IconButton
						sx={{padding: 0}}
						onClick={() => {
							restablecerFiltros();
							setFiltrosAplicados(estadoInicialFiltros);
						}}
					>
						<Box
							alignItems='center'
							display='flex'
							border={`1px solid ${theme.palette.secondary.main}`}
							borderRadius='50px'
							gap='4px'
							minHeight='32px'
							padding='8px 16px'
							sx={{background: '#fff'}}
							width='147px'
						>
							<BorrarIcon height={13} width={13} />
							<Typography
								color='secondary'
								fontFamily='Open Sans'
								variant='subtitle3'
							>
								{t('general.borrarSeleccion')}
							</Typography>
						</Box>
					</IconButton>
				)}
				<IconButton
					sx={{padding: 0}}
					onClick={() => {
						setFiltrosBusqueda(filtrosAplicados);
						setAbrirFiltros(false);
					}}
					disabled={
						cantidadFiltrosAplicados === 0 && cantidadFiltrosSeleccionados === 0
					}
				>
					<Box
						alignItems='center'
						display='flex'
						borderRadius='50px'
						gap='4px'
						minHeight='32px'
						padding='8px 16px'
						sx={{
							background: theme.palette.secondary.main,
							opacity:
								cantidadFiltrosAplicados === 0 &&
								cantidadFiltrosSeleccionados === 0
									? 0.5
									: 1,
						}}
						width='147px'
					>
						<Typography variant='subtitle3' fontFamily='Open Sans' color='#fff'>
							{t('general.mostrarResultados')}
						</Typography>
					</Box>
				</IconButton>
			</Box>
		</>
	);
};
