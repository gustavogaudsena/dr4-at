import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const TextFieldComponent: React.FC<TextFieldProps> = ({ ...props }) => {
    return <TextField className="general-textfield" {...props} />

}

export default TextFieldComponent;