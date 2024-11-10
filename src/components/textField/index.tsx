import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const TextFieldComponent: React.FC<TextFieldProps> = ({ ...props }) => {
    return <TextField {...props} />

}

export default TextFieldComponent;