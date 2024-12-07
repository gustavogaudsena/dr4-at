import React, { useEffect, useState } from "react"
import baby from '../../assets/images/baby.png';
import fralda from '../../assets/images/fralda.png';
import sono from '../../assets/images/sono.png';
import mamadeira from '../../assets/images/mamadeira.png';
import { list } from "../../services/supabasedb";

import { AppBar, Avatar, Box, CardNewItem, CustomList, Grid, Typography } from "../../components"
import { useAppContext } from "../../Context";
import { Logout, Settings } from "@mui/icons-material";
import authenticator from "../../services/authenticator";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
    {
        title: 'sleep',
        redirect: 'sleep',
        avatar: sono,
        color: '#4b10a9'
    },
    {
        title: 'eat',
        redirect: 'eat',
        avatar: mamadeira,
        color: '#47c869'
    },
    {
        title: 'diaper',
        redirect: 'diaper',
        avatar: fralda,
        color: '#f4cc1d'
    }
]
const Home: React.FC = () => {
    const { translate } = useAppContext();
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])

    const loadData = async () => {
        const d = await list("list_items");
        setData(d);

    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <AppBar title={translate('appName')} firstIcon={{ icon: <Logout />, handleClick: () => { authenticator.logout(); navigate('/signin') } }} secondIcon={{ icon: <Settings />, handleClick: () => navigate('settings') }} />
            <Box sx={styles.box} >
                <Grid container spacing={2} sx={{ xs: 12, ...styles.border }} alignItems={'center'} justifyContent={'center'}>
                    <Grid sx={styles.infoGrid}
                        size={{ xs: 12 }}>
                        <Grid sx={styles.avatarContainer}>
                            <Avatar sx={styles.babyAvatar} src={baby} />
                        </Grid>
                        <Grid sx={{ ...styles.columnGrid, ...styles.flexGrow1, ...styles.fullWidth }}>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("Nome")}: </Typography>
                                <Typography>Juscelino</Typography>
                            </Grid>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("Peso")}: </Typography>
                                <Typography>4kg</Typography>

                            </Grid>
                            <Grid sx={styles.rowGrid}>
                                <Typography sx={styles.bold}>{translate("Comprimento")}: </Typography>
                                <Typography>60 cm</Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        ACTIONS.map(action =>
                            <Grid size={{ xs: 4 }}>
                                <CardNewItem
                                    title={translate(action.title)}
                                    avatar={action.avatar}
                                    color={action.color}
                                    redirect={action.redirect}
                                />
                            </Grid>
                        )
                    }
                    <Grid container={true} sx={{
                        marginTop: '1em'
                    }}>
                        <Grid size={{ xs: 12 }}>
                            {data ?
                                <CustomList
                                    sx={{
                                        overflow: 'auto',
                                        maxHeight: '56.5vh'
                                    }}
                                    items={data}
                                /> : null}
                        </Grid>
                    </Grid>
                    {/* <Grid
                        sx={styles.fraldaGrid}
                        size={{ xs: 4 }}>
                        <Avatar sx={styles.avatar} src={fralda} />
                        <Typography sx={{ ...styles.textCenter, ...styles.bold, ...styles.uppercase }}>{translate("Fralda")}</Typography>
                        <Typography sx={{ ...styles.textCenter }}>{translate("Suja de Fezes e de urina")}</Typography>

                    </Grid>
                    <Grid
                        sx={styles.fraldaGrid}
                        size={{ xs: 4 }}>
                        <Avatar sx={styles.avatar} src={sono} />
                        <Typography sx={{ ...styles.textCenter, ...styles.bold, ...styles.uppercase }}>{translate("Sono")}</Typography>
                        <Typography sx={{ ...styles.textCenter }}>22:00 ás 06:00</Typography>
                        {false &&
                            <>

                                <Typography>{translate("Suja de Fezes")}</Typography>
                                <Typography>{translate("Limpa")}</Typography>
                            </>
                        }
                    </Grid>
                    <Grid
                        sx={styles.fraldaGrid}
                        size={{ xs: 4 }}>
                        <Avatar sx={styles.avatar} src={mamadeira} />
                        <Typography sx={{ ...styles.textCenter, ...styles.bold, ...styles.uppercase }}>{translate("Amamentação")}</Typography>
                        <Typography sx={{ ...styles.textCenter }}>22:00 ás 06:00</Typography>

                    </Grid> */}

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
    border: {
        // border: '1px solid var(--secondary)',
        // backgroundColor: 'var(--secondary)',
        // color: 'var(--white)',
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