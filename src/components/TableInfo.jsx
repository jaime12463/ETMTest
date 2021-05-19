import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    magintop: 10,
    maxHeight: 280,
  },
  alignment: {
    textAlign: "center",
  },
});

export const TableInfo = ({ headers, data, onClick }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="a dense table" size="small">
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell key={column} className={classes.alignment}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((producto) => (
            <TableRow
              hover
              key={producto.Codigoproducto}
              onClick={() =>
                onClick({
                  producto: producto.Codigoproducto,
                  unidades: 0,
                  precio: producto.PrecioConImpuesto,
                })
              }
            >
              <TableCell className={classes.alignment}>
                {producto.Codigoproducto}
              </TableCell>
              <TableCell className={classes.alignment}>
                $ {producto.PrecioConImpuesto}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
