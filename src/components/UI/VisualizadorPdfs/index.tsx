import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {Document, Page, pdfjs} from 'react-pdf';
import {CerrarIcon} from 'assests/iconos';

pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.min.js`;

console.log(pdfjs.version);

export type Props = {
	titulo: string;
	archivo: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VisualizadorPdfs({titulo, archivo, setOpen}: Props) {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const options = {
		cMapUrl: 'cmaps/',
		cMapPacked: true,
		width: 300,
	};

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
					onLoadError={(error) => console.log(error)}
					options={options}
				>
					<Page pageNumber={pageNumber} width={340} />
				</Document>
			</Box>
		</>
	);
}
