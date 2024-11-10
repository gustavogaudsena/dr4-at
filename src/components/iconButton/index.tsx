import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

interface IIconButtonProps extends IconButtonProps {
    props?: any,
    children: React.ReactNode
}

const IconButtonComponent: React.FC<IIconButtonProps> = ({ children, ...props }) => {
    return <IconButton {...props}>{children}</IconButton>

}

export default IconButtonComponent;