import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import Headers from "assests/images/pop_up_onda.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

type Props = {
    titulo: string,
    esConFechaHaciaAtras?: boolean,
};

const Encabezado = (props: Props) => {
    const { t } = useTranslation();
    const history = useHistory();
    return (
        <Box display="flex" justifyContent="center">
            <Box
                display="flex"
                style={{
                    background: `url(${Headers}) no-repeat`,
                    height: "75px",
                    width: "430px",
                }}
            >
                <Grid item xs={2} style={{ marginTop: "17px" }}>
                    {props.esConFechaHaciaAtras && (
                        <IconButton size="small" onClick={() => history.goBack()}>
                            <ArrowBackIcon style={{ color: "white" }} />
                        </IconButton>
                    )}
                </Grid>
                <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Typography
                        variant="subtitle1"
                        style={{ marginTop: "20px", color: "white" }}
                    >
                        {t(props.titulo)}
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
            </Box>
        </Box>
    );
}
export default Encabezado;
