import { Snackbar, SnackbarProps } from "@mui/material";
import React from "react";

interface ISnackbarProps extends SnackbarProps {
    props?: any
}

const SnackbarComponent: React.FC<ISnackbarProps> = ({ ...props }) => {
    return <Snackbar {...props} />

}

export default SnackbarComponent;