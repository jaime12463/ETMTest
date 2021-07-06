import {Box, TableCell, TableHead, TableRow} from '@material-ui/core';

type PropsEncabezado = {
	atributos: string[];
};

export const Encabezado = ({atributos}: PropsEncabezado) => {
	return (
		<TableHead>
			<TableRow>
				{atributos.map((column, index) => (
					<TableCell
						key={index}
						align={index == atributos.length - 1 ? 'right' : 'left'}
						padding='none'
					>
						<Box my={1} mx={1}>
							{column}
						</Box>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
