import { Table } from "@material-ui/core";

type Size = "small" | "medium";

type PropsTabla = {
  size?: Size | undefined;
  stickyHeader?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const Tabla = ({ children, size, stickyHeader }: PropsTabla) => {
  return (
    <Table stickyHeader={stickyHeader} size={size}>
      {children}
    </Table>
  );
};
