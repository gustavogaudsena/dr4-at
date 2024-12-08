import { useNavigate } from "react-router-dom"
import { Avatar, Card, Fab, Grid, Typography } from ".."
import AddIcon from '@mui/icons-material/Add';

interface ICardNewItemComponent {
    title: string
    avatar: any
    redirect: string
    props?: any
}


const CardNewItemComponent: React.FC<ICardNewItemComponent> = ({ avatar, title, redirect }) => {

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
        fontSize: '.72em',
        marginTop: '0.5em',
        fontWeight: 'bold',
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