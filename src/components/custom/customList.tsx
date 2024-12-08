
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import { Avatar } from "..";
import fralda from '../../assets/images/fralda.png';
import sono from '../../assets/images/sono.png';
import mamadeira from '../../assets/images/mamadeira.png';
import CribIcon from '@mui/icons-material/Crib';



interface ICustomListComponent {
    items: { type: keyof typeof TYPES_MAP, id: string, start_date: string }[],
    sx: any
    props?: any
}

const TYPES_MAP = {
    sleep: {
        logo: sono,
        icon: <CribIcon />,
        color: "#4b10a9",
        text: 'sleep'
    },
    eat: {
        logo: mamadeira,
        icon: <CribIcon />,
        color: "#4b10a9",
        text: 'eat'
    },
    diaper: {
        logo: fralda,
        icon: <CribIcon />,
        color: "#4b10a9",
        text: 'diaper'
    }
}

const CustomList: React.FC<ICustomListComponent> = ({ items, sx, ...props }) => {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    const handleClick: { (type: string, id: string | number): void } = (type, id) => {
        navigate(`/${type}/${id}`)
    }

    return (
        <List sx={sx} {...props}>
            {
                items.map((item, index) => {
                    return <ListItem
                        sx={styles.listItem}
                        key={`custom-list-item-${index}`}
                        id={`custom-list-item-${index}`}
                        onClick={() => handleClick(item.type, item.id)}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ ...styles.avatar }} src={TYPES_MAP[item.type].logo} />

                        </ListItemAvatar>
                        <ListItemText primary={translate(TYPES_MAP[item.type].text)} secondary={(new Date(item.start_date)).toLocaleDateString('pt-BR')} />
                    </ListItem>
                })
            }
        </List>)
}

export default CustomList

const styles = {
    listItem: {
        width: '100%',
        backgroundColor: "var(--gray-op)",
        borderRadius: "60px",
        marginTop: '1em',
        cursor: "pointer"
    },
    avatar: {
        backgroundColor: "var(--secondary)",
        padding: '5px',
        width: '45px',
        height: '45px'
    }
}