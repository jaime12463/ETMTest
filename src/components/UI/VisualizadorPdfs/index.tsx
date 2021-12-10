import React, { useState } from 'react';
import { Card, Box, Typography, Stack, IconButton} from '@mui/material';
import ModalCore from '../ModalCore';
import { Document, Page ,pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc =`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export type Props ={
    titulo:string;
    archivo:string;
    open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VisualizadorPdfs({
    titulo,
    archivo,
	open,
	setOpen,
}:Props) {
 
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  width:300
};

  return (
    <ModalCore
		titulo={titulo}
		subtitulo={"subtitulo"}
		open={open}
		setOpen={setOpen}
	>
    
    <div>
      <Document
        file={`${process.env.PUBLIC_URL}/archivos/${archivo}`}
       onLoadSuccess={
        (pdf) => alert('Loaded a file with ' + pdf.numPages + ' pages!')
       }
       onLoadError={
        (error) => console.log( error)
       }
       options={options}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div> 
    </ModalCore>
  );
}
