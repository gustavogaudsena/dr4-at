
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import { Avatar } from "..";

import CribIcon from '@mui/icons-material/Crib';



interface ICustomListComponent {
    items: { type: keyof typeof TYPES_MAP, id: string, start_date: string }[],
    sx: any
    props?: any
}

const TYPES_MAP = {
    sleep: {
        icon: <CribIcon />,
        color: "#4b10a9",
        text: 'sleep'
    },
    eat: {
        icon: <CribIcon />,
        color: "#4b10a9",
        text: 'eat'
    },
    diaper: {
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
                    return <ListItem sx={styles.listItem}
                        key={`custom-list-item-${index}`}
                        id={`custom-list-item-${index}`}
                        onClick={() => handleClick(item.type, item.id)}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: TYPES_MAP[item.type].color }} >
                                {TYPES_MAP[item.type].icon}
                            </Avatar>
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
        backgroundColor: "#fff",
        borderRadius: "60px",
        marginTop: '1em'
    }
}