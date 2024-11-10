import { Alert, AlertProps } from "@mui/material";
import React from "react";

interface IAlertProps extends AlertProps {
    props?: any
}

const AlertComponent: React.FC<IAlertProps> = ({ ...props }) => {
    return <Alert {...props} />
}

export default AlertComponent;