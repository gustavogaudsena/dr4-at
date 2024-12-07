import React, { useEffect, useState } from "react"
import { AppBar, Button, Grid, TextField, Typography } from "../../components";
import { useAppContext } from "../../Context";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getUser, handleInputChange } from "../../utils/core";
import { default as styles } from "../../utils/customStyles"
import authenticator from "../../services/authenticator";
import { get, save } from "../../services/supabasedb";

const Settings: React.FC = () => {
    const { translate, changeLanguage, SUPABASE } = useAppContext()
    const navigate = useNavigate()
    const user = getUser();
    const [data, setData] = useState<any>({});

    const loadData = async () => {
        const result = await get("baby_list", [{ field: "user_id", value: user.id }]);
        setData(result);
    }

    useEffect(() => {
        loadData();
    }, [])

    const verifyLanguage = (language: string) => {
        const storeLanguage = localStorage.getItem('language');
        if (storeLanguage === language) {
            return 'contained';
        }
        return 'outlined';
    }

    const handleSave = async () => {
        data.user_id = user.id;
         save('list_items', data);
    }

    return (
        <>
            <AppBar title={translate('settings')} firstIcon={{ icon: <ArrowBackIos />, handleClick: () => navigate('/') }} secondIcon={{ icon: <></>, handleClick: () => navigate('settings') }} />
            <Grid container spacing={2} sx={{ ...styles.padding2, ...styles.centerBox }}>
                <Grid
                    size={{ xs: 12 }}>
                    <TextField
                        label={translate("name")}
                        fullWidth={true}
                        onChange={(event) => handleInputChange("name", event.target.value, data, setData)}
                        value={data.name ? data.name : null}
                    />
                </Grid>
                <Grid
                    size={{ xs: 12 }}>
                    <TextField
                        label={translate("height")}
                        fullWidth={true}
                        onChange={(event) => handleInputChange("height", event.target.value, data, setData)}
                        value={data.height}
                    />
                </Grid >
                <Grid
                    size={{ xs: 12 }}>
                    <TextField
                        label={translate("weight")}
                        placeholder={translate("weight")}
                        fullWidth={true}
                        onChange={(event) => handleInputChange("weight", event.target.value, data, setData)}
                        value={data.weight}
                    />
                </Grid>
                <Grid
                    size={{ xs: 12 }}>
                    <Button onClick={handleSave} fullWidth={true}>{translate('save')}</Button>
                </Grid>
                <Grid

                    size={{ xs: 12 }}>
                    <Typography variant="h5">{translate("app_language")}:</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        onClick={() => changeLanguage('en')}
                        variant={verifyLanguage('en')}
                        fullWidth={true}>{translate('english')}</Button>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        onClick={() => changeLanguage('pt')}
                        variant={verifyLanguage('pt')}
                        fullWidth={true}>
                        {translate('portugues')}</Button>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        onClick={() => { authenticator.logout(); navigate('/signin') }}
                        fullWidth={true}
                        color="error">
                        {translate('logout')}</Button>
                </Grid>
            </Grid>
        </>
    )

}

export default Settings;


// const { translate, changeLanguage, supabase } = useAppContext();
// const navigate = useNavigate();
// const user = getUser();
// const [data, setData] = useState({});

// const loadData = async () => {
//     const result = await get("profile_students", [{field: "user_id", value: user.id }]);
//     setData(result);
// }

// useEffect(() => {
//     loadData();
// }, [])

// const verifyLanguage = (language) => {
//     const storeLanguage = localStorage.getItem('language');
//     if(storeLanguage === language) {
//         return 'contained';
//     }
//     return 'outlined';
// }

// return  <>
//             <AppBar title={translate('settings')} />
//             <Grid container spacing={2} sx={{...styles.boxAdjustment, ...styles.centerBox}}>
//                 <Grid
//                   
//                     item={true} size={{xs: 12}}>
//                     <TextField
//                         placeholder={translate("name")}
//                         fullWidth={true}
//                         onChange={(event) => handleInputChange("name", event.target.value, data, setData)}
//                         value={data.name ? data.name : null}
//                     />
//                 </Grid>
//                 <Grid
//                     sx={styles.marginTop}
//                     item={true} size={{xs: 12}}>
//                     <TextField
//                         placeholder={translate("height")}
//                         fullWidth={true}
//                         onChange={(event) => handleInputChange("height", event.target.value, data, setData)}
//                         value={data.height}
//                     />
//                 </Grid>
//                 <Grid
//                     sx={styles.marginTop}
//                     item={true} size={{xs: 12}}>
//                     <TextField
//                         placeholder={translate("weight")}
//                         fullWidth={true}
//                         onChange={(event) => handleInputChange("weight", event.target.value, data, setData)}
//                         value={data.weight}
//                     />
//                 </Grid>
//                 <Grid
//                     sx={styles.marginTop}
//                     item={true} size={{xs: 12}}>
//                     <DatePicker
//                         value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
//                         placeholder={translate("birth")}
//                         name="birth"
//                         fullWidth={true}
//                         ampm={false}
//                         format="DD/MM/YYYY"
//                         onChange={(value) => {handleInputChange('birth', new Date(value.toString()), data, setData)}}
//                     />
//                 </Grid>
//                 <Grid
//                     item={true} size={{xs: 12}}>
//                     <Button onClick={async () => {
//                         data.user_id = user.id;
//                         await save('profile_students', data);
//                     }} fullWidth={true}>{translate('save')}</Button>
//                 </Grid>
//                 <Grid
//                     sx={styles.marginTop}
//                     item={true} size={{xs: 12}}>
//                         <Typography variant="h5">{translate("app_language")}:</Typography>
//                 </Grid>
//                 <Grid item={true} size={{ xs: 12 }}>
//                     <Button onClick={() => changeLanguage('en')}
//                         variant={verifyLanguage('en')}
//                         fullWidth={true}
//                         sx={{...styles.button}}>{translate('english')}</Button>
//                 </Grid>
//                 <Grid item={true} size={{ xs: 12 }}>
//                     <Button onClick={() => changeLanguage('es')}
//                         variant={verifyLanguage('es')}
//                         fullWidth={true}
//                         sx={{...styles.button}}>{translate('spanish')}</Button>
//                 </Grid>
//                 <Grid item={true} size={{ xs: 12 }}>
//                     <Button onClick={() => changeLanguage('pt')} 
//                         variant={verifyLanguage('pt')}
//                         fullWidth={true}
//                         sx={{...styles.button}}>{translate('portugues')}</Button>
//                 </Grid>
//                 <Grid item={true} size={{ xs: 12 }}>
//                     <Button onClick={() => signOut(supabase, navigate)} 
//                         fullWidth={true}
//                         color="error"
//                         sx={{...styles.button}}>{translate('logout')}</Button>
//                 </Grid>
//             </Grid>
//         </>