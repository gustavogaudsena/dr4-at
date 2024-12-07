import { useNavigate } from "react-router-dom"
import { Avatar, Card, Fab, Grid, Typography } from ".."
import AddIcon from '@mui/icons-material/Add';

interface ICardNewItemComponent {
    title: string
    avatar: any
    color: string
    redirect: string
    props?: any
}


const CardNewItemComponent: React.FC<ICardNewItemComponent> = ({ avatar, color, title, redirect }) => {

    const navigate = useNavigate();
    return (
        <Card sx={{
            overflow: 'visible',
            borderRadius: '10%',
            padding: 1,
            backgroundColor: 'var(--gray-op)'
        }}>
            <Grid sx={{ ...styles.container }}>
                <Avatar sx={styles.avatar} src={avatar} />
                {/* < Icon sx={{ ...styles.icon, color }} /> */}
                <Typography sx={styles.title}>{title}</Typography>
            </Grid>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Fab
                    size="small"
                    sx={{ ...styles.fab }}
                    onClick={() => navigate(`/new/${redirect}`)}
                ><AddIcon /></Fab>
            </Grid>
        </Card >)

}

const styles = {
    icon: {
        marginTop: '.2em',
        fontSize: '3em'
    },
    fab: {
        backgroundColor: "var(--secondary)",
        color: "var(--gray)",
        position: 'relative',
        bottom: '-20px'
    },
    avatar: {
        width: '75px',
        height: '75px'
    },
    title: {
        fontSize: '.80em',
        marginTop: '0.5em',
        fontWeight: '700',
        textAlign: 'center',
        wordWrap: "break-word",
        width: "90%"
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default CardNewItemComponent;


// const CardNewItemComponent = ({Icon, color, title, actionType}) => {
//     const navigate = useNavigate();
//     const { translate } = useAppContext();

//     return <Card sx={{
//         overflow: 'visible',
//         borderRadius: '10%'
//     }}>
//                 <Grid sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                 }}>
//                     <Icon 
//                         sx={{
//                             marginTop: '.2em',
//                             fontSize: '3em',
//                             color: color
//                         }}/>
//                     <Typography
//                         sx={{
//                             fontSize: '.80em',
//                             marginTop: '0.5em',
//                             fontWeight: '700',
//                             textAlign: 'center',
//                             wordWrap: "break-word",
//                             width: "90%"
//                         }}
//                     >{title}</Typography>
//                 </Grid>
//                 <Grid sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                 }}>
//                     <Typography
//                         sx={{
//                             marginTop: '0.5em',
//                             fontSize: '0.8em',
//                             fontWeight: '400',
//                             color: "#8f8f8f"
//                         }}
//                     >{translate('add_something')}</Typography>
//                 </Grid>
//                 <Grid sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}>
//                     <Fab
//                         size="small"
//                         sx={{
//                             color: color,
//                             backgroundColor: "#fff",
//                             position: 'relative',
//                             bottom: '-20px'
//                         }}
//                         onClick={() => navigate(`/new/${actionType}`)}
//                     ><AddIcon /></Fab>
//                 </Grid>
//             </Card>
// }

// export default CardNewItemComponent;