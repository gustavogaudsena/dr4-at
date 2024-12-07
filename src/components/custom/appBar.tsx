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
                    {!firstIcon && <></>}
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
                    {!secondIcon && <></>}
                </Grid>
            </Toolbar>
        </AppBar>)
}

export default AppBarComponent;


// const AppBarComponent = ({ ...props }) => {
//     const navigate = useNavigate();

//     return <AppBar position="static">
//         <Toolbar>
//             <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="menu"
//                 sx={{
//                     position: 'relative',
//                     zIndex: '2'
//                 }}
//                 onClick={() => navigate("/")}
//             >
//                 <ArrowBackIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{
//                 flexGrow: 1,
//                 textAlign: 'center',
//                 position: 'absolute',
//                 left: '0',
//                 width: '100%',
//                 zIndex: '1'
//             }}>
//                 {props.title}
//             </Typography>
//             {
//                 props.id ? <Box sx={{
//                     display: { xs: 'flex', md: 'none' },
//                     position: 'absolute',
//                     right: '1.5em'
//                 }}>
//                     <IconButton
//                         size="large"
//                         edge="end"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{
//                             position: 'relative',
//                             zIndex: '2'
//                         }}
//                         onClick={props._delete}
//                     >
//                         <DeleteIcon />
//                     </IconButton>
//                 </Box> : null
//             }
//         </Toolbar>
//     </AppBar>
// }

// export default AppBarComponent;