import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface IButtonProps extends ButtonProps {
    props?: any,
    children: React.ReactNode
}

const ButtonComponent: React.FC<IButtonProps> = ({ children, ...props }) => {
    return <Button className="general-button" {...props}>{children}</Button>

}

export default ButtonComponent;