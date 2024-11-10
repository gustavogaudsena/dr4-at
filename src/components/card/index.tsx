import { Card, CardProps } from "@mui/material";
import React from "react";

interface ICardProps extends CardProps {
    props?: any,
    children?: React.ReactNode
}

const CardComponent: React.FC<ICardProps> = ({ children, ...props }) => {
    return <Card {...props} >{children}</Card>
}

export default CardComponent;