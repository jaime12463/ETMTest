import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";

export type Props = {
  titulo?: string;
  mensaje?: string;
  conBotonCancelar?: boolean;
  manejadorClick: (oprimioBotonAceptar: boolean) => void;
};

const Dialogo = ({
  titulo = "",
  mensaje = "",
  conBotonCancelar = false,
  manejadorClick,
}: Props) => {
  const { t } = useTranslation();

  const manejarClick = (oprimioBotonAceptar: boolean) => {
    manejadorClick(oprimioBotonAceptar);
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {titulo !== "" && (
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      )}
      {mensaje !== "" && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensaje}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {conBotonCancelar && (
          <Button onClick={() => manejarClick(false)} color="primary">
            {t("general.cancelar")}
          </Button>
        )}
        <Button onClick={() => manejarClick(true)} color="primary" autoFocus>
          {t("general.aceptar")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialogo;
