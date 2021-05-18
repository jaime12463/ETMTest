import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const TableInfo = ({ headers, data }) => {
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {headers.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((producto) => (
          <TableRow hover key={producto.Codigoproducto}>
            <TableCell>{producto.Codigoproducto}</TableCell>
            <TableCell>{producto.PrecioConImpuesto}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
