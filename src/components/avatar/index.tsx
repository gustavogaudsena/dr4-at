import { Avatar, AvatarProps } from "@mui/material";
import React from "react";

interface IAvatarProps extends AvatarProps {
    props?: any
}

const AvatarComponent: React.FC<IAvatarProps> = ({ ...props }) => {
    return <Avatar {...props} />
}

export default AvatarComponent;