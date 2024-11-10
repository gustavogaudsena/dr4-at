import { Checkbox, CheckboxProps } from "@mui/material";
import React from "react";

interface ICheckboxProps extends CheckboxProps {
    props?: any
}

const CheckboxComponent: React.FC<ICheckboxProps> = ({ ...props }) => {
    return <Checkbox {...props} />
}

export default CheckboxComponent;