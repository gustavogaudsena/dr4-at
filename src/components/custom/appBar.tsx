import { AppBar, AppBarProps, Toolbar } from "@mui/material";
import { Grid, IconButton, Typography } from "..";
import { default as styles } from "../../utils/customStyles";
import { ReactElement } from "react";


interface IAppBarProps extends AppBarProps {
    title: string
    firstIcon?: {
        handleClick: (...args: any) => void,
        icon: ReactElement
    }
    secondIcon?: {
        handleClick: (...args: any) => void,
        icon: ReactElement
    }
    props?: any
}

const AppBarComponent: React.FC<IAppBarProps> = ({ title, firstIcon, secondIcon, ...props }) => {
    return (
        <AppBar position="static" {...props} className="general-app-bar">
            <Toolbar variant="dense"  >
                <Grid container justifyContent={'space-between'} width={'100%'} gap={2} wrap="nowrap">
                    {!firstIcon && <div></div>}
                    {firstIcon &&
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={firstIcon.handleClick}>
                            {firstIcon.icon}
                        </IconButton>
                    }
                    <Typography variant="h6" color="inherit" component="div" sx={{ ...styles.uppercase, ...styles.textCenter }}>
                        {title}
                    </Typography>
                    {
                        secondIcon &&
                        <IconButton edge="end" color="inherit"  sx={{ ml: 2 }} onClick={secondIcon.handleClick}>
                            {secondIcon.icon}
                        </IconButton>
                    }
                    {!secondIcon && <div></div>}
                </Grid>
            </Toolbar>
        </AppBar>)
}

export default AppBarComponent;