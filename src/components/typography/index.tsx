import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface ITypographyProps extends TypographyProps {
    children: React.ReactNode,
    props?: any
}

const TypographyComponent: React.FC<ITypographyProps> = ({ children, ...props }) => {
    return <Typography {...props} >{children}</Typography>

}

export default TypographyComponent;