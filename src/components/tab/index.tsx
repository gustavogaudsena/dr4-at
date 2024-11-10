import { Tab, TabProps } from "@mui/material";
import React from "react";

interface ITabProps extends TabProps {
    props?: any
}

const TabComponent: React.FC<ITabProps> = ({ ...props }) => {
    return <Tab {...props} />

}

export default TabComponent;