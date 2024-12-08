import React, { useEffect, useState } from "react"
import babyLogo from '../../assets/images/baby.png';
import fralda from '../../assets/images/fralda.png';
import sono from '../../assets/images/sono.png';
import mamadeira from '../../assets/images/mamadeira.png';
import { list } from "../../services/supabasedb";

import { AppBar, Avatar, Box, Button, CardNewItem, CustomList, Grid, Typography } from "../../components"
import { useAppContext } from "../../Context";
import { Logout, Settings } from "@mui/icons-material";
import authenticator from "../../services/authenticator";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
    {
        title: 'sleep',
        redirect: 'sleep',
        avatar: sono,
    },
    {
        title: 'eat',
        redirect: 'eat',
        avatar: mamadeira,
    },
    {
        title: 'diaper',
        redirect: 'diaper',
        avatar: fralda,
    }
]
const Home: React.FC = () => {
    const { translate } = useAppContext();
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    const [baby, setBaby] = useState<{ name?: string, height?: number, weight?: number }>({})

    const loadData = async () => {
        const d = await list("list_items");
        const babyProfile = await list("baby");
        if (babyProfile?.[0]) setBaby(babyProfile?.[0])
        if (d) setData(d);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <AppBar title={translate('appName')} firstIcon={{ icon: <Logout />, handleClick: () => { authenticator.logout(); setData([]); setBaby({}); navigate('/signin') } }} secondIcon={{ icon: <Settings />, handleClick: () => navigate('settings') }} />
            <Box sx={styles.box} >
                <Grid container spacing={1.5} sx={{ xs: 12, ...styles.border }} alignItems={'center'} justifyContent={'center'}>
                    <Grid sx={styles.infoGrid}
                        size={{ xs: 12 }}>
                        <Grid sx={styles.avatarContainer}>
                            <Avatar sx={styles.babyAvatar} src={babyLogo} />
                        </Grid>
                        <Grid sx={{ ...styles.columnGrid, ...styles.flexGrow1, ...styles.fullWidth }}>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("name")}: </Typography>
                                <Typography>{baby?.name ?? 'Configure o nome do bebe'}</Typography>
                            </Grid>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("weight")}: </Typography>
                                <Typography>{baby?.weight ?? '-'} kg</Typography>

                            </Grid>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("height")}: </Typography>
                                <Typography>{baby?.height ?? '-'} cm</Typography>
                            </Grid>
                        </Grid>
                        <Grid paddingBottom={1} size={8} alignSelf={'center'}>
                            <Button
                                type="button"
                                sx={styles.dashboardButton}
                                variant="outlined"
                                onClick={() => navigate('/dashboard')}
                            >
                                {translate('Dashboard')}
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        ACTIONS.map(action =>
                            <Grid size={{ xs: 4 }}>
                                <CardNewItem
                                    title={translate(action.title)}
                                    avatar={action.avatar}
                                    redirect={action.redirect}
                                />
                            </Grid>
                        )
                    }
                    <Grid container={true} size={{ xs: 12 }}>
                        <Grid size={{ xs: 12 }}>
                            {data ?
                                <CustomList
                                    sx={{
                                        width: '100%',
                                        overflow: 'auto',
                                        maxHeight: '56.5vh'
                                    }}
                                    items={data}
                                /> : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

const styles = {
    box: {
        height: '100vh',
        alignContent: 'start',
        padding: 2,
    },
    avatarContainer: {
        backgroundColor: 'var(--secondary-op)',
        borderRadius: '100%',
        marginTop: 1
    },
    dashboardButton: {
        width: '100%'
    },
    border: {
        borderRadius: '10px',
        padding: 0,
        paddingTop: 2,
        paddingBottom: 2,
    },
    avatar: {
        width: '75px',
        height: '75px'
    },
    babyAvatar: {
        width: '200px',
        height: '200px'
    },
    gap: {
        gap: 3
    },
    centerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: '1'
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: '0',
        backgroundColor: 'var(--gray-op)',
        borderRadius: '20px'
    },
    fraldaGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },
    rowGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        width: '100%'
    },
    textCenter: {
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    flexGrow1: {
        flexGrow: 1
    },
    fullWidth: {
        width: '100%'
    }
}

export default Home