import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {Document, Page, pdfjs} from 'react-pdf';
import {CerrarIcon} from 'assests/iconos';
import {useMostrarAviso} from 'hooks';
import {useTranslation} from 'react-i18next';

pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.min.js`;

console.log(pdfjs.version);

export type Props = {
	titulo: string;
	archivo: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VisualizadorPdfs({titulo, archivo, setOpen}: Props) {
	const [pageNumber, setPageNumber] = useState(1);
	const options = {
		cMapUrl: 'cmaps/',
		cMapPacked: true,
		width: 300,
	};
	const mostrarAviso = useMostrarAviso();
	const {t} = useTranslation();

	return (
		<>
			<Box
				alignItems='center'
				display='flex'
				justifyContent='space-between'
				onClick={() => setOpen((prevState) => !prevState)}
				padding='25px'
				sx={{cursor: 'pointer'}}
				width='100%'
			>
				<Typography variant='subtitle2' fontFamily='Open Sans' color='#565657'>
					{titulo}
				</Typography>
				<CerrarIcon fill='#000' />
			</Box>
			<Box>
				<Document
					file={`${process.env.PUBLIC_URL}/archivos/${archivo}`}
					onLoadError={(error) => {
						mostrarAviso(
							'error',
							t('advertencias.pdfErrorTitulo'),
							t('advertencias.pdfErrorDescripcion'),
							undefined,
							'errorPDF'
						);
						setOpen(false);
					}}
					options={options}
				>
					<Page pageNumber={pageNumber} width={340} />
				</Document>
			</Box>
		</>
	);
}
