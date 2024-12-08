import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Grid, Typography } from "../../components";
import { ArrowBackIos } from "@mui/icons-material";
import { useAppContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import babyLogo from '../../assets/images/baby.png';
import { list } from "../../services/supabasedb";
import fralda from '../../assets/images/fralda.png';
import sono from '../../assets/images/sono.png';
import mamadeira from '../../assets/images/mamadeira.png';

const Dashboard: React.FC = () => {
    const { translate } = useAppContext()
    const navigate = useNavigate()

    const [data, setData] = useState<any[]>([])
    const [countData, setCountData] = useState<any>(null)
    const [baby, setBaby] = useState<{ name?: string, height?: number, weight?: number }>({})

    const loadData = async () => {
        const d = await list("list_items");
        const babyProfile = await list("baby");
        if (babyProfile?.[0]) setBaby(babyProfile?.[0])
        if (d) { setData(d); countList(d) }
    }

    useEffect(() => {
        loadData();
    }, [])

    const countList = (items: any[]) => {
        const sleep = items.filter(item => item.type === 'sleep').length
        const eat = items.filter(item => item.type === 'eat').length
        const diaper = items.filter(item => item.type === 'diaper').length

        setCountData({
            sleep,
            eat,
            diaper
        })
    }


    return <>
        <AppBar title={translate('Dashboard')} firstIcon={{ icon: <ArrowBackIos />, handleClick: () => navigate('/') }} />
        <Box sx={styles.box} >
            <Grid container>
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
                        {
                            countData &&
                            <>
                                <Grid sx={styles.columnGrid}>
                                    <Avatar sx={styles.avatar} src={sono} />
                                    <Typography>{baby?.name ?? translate('theBaby')} {translate('sleepDashboard')} {countData.sleep} {translate('times')}</Typography>
                                </Grid>
                                <Grid sx={styles.columnGrid}>
                                    <Avatar sx={styles.avatar} src={mamadeira} />
                                    <Typography>{baby?.name ?? translate('theBaby')} {translate('eatDashboard')} {countData.eat} {translate('times')}</Typography>
                                </Grid>
                                <Grid sx={styles.columnGrid}>
                                    <Avatar sx={styles.avatar} src={fralda} />
                                    <Typography>{baby?.name ?? translate('theBaby')} {translate('diaperDashboard')} {countData.diaper} {translate('diapers')}</Typography>
                                </Grid>

                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>
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
        borderRadius: '10px',
        padding: 0,
        paddingTop: 2,
        paddingBottom: 2,
    },
    avatar: {
        width: '45px',
        height: '45px'
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


export default Dashboard