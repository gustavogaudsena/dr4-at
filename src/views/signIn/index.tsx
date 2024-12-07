import React, { useState } from "react"
import { useAppContext } from "../../Context";
import { Avatar, Box, Button, Grid, TextField, Typography } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/baby-logo.png';
import { handleChange } from "../../utils/core";
import authenticator from "../../services/authenticator";

const MOCK_DB = {
    user: {
        email: 'fake_email@gmail.com',
        password: 'mystrongpassword'
    }
}
const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: {
            value: MOCK_DB.user.email,
            error: null,
            helperText: null
        },
        password: {
            value: MOCK_DB.user.password,
            error: null,
            helperText: null
        },
    })

    const { SUPABASE, translate, showAlertMessage } = useAppContext()

    const verifyLogin = async () => {
        let { error } = await authenticator.signIn(data.email.value, data.password.value, SUPABASE);

        if (error?.message === 'Invalid login credentials') return showAlertMessage({ message: translate('invalidLoginCredentials'), severity: 'error' });
        else if (error) return showAlertMessage({ message: translate('loginError'), severity: 'error' });
        else navigate('/')
    }

    return <Box
        sx={styles.box}
    >
        <Grid
            sx={styles.boxAdjustment}
            container
            spacing={2}>
            <Grid
                sx={styles.centerBox}
                size={{ xs: 12 }}>
                <Typography sx={styles.loginText} variant="h4">{translate('appName')}</Typography>
            </Grid>
            <Grid
                sx={styles.centerBox}
                size={{ xs: 12 }}
            >
                <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={logo}
                />
            </Grid>



            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <TextField
                    label={translate("email")}
                    fullWidth={true}
                    onChange={(event) => handleChange(data, setData, event.target.value, "email")}
                    value={data.email.value}
                />
            </Grid>
            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <TextField
                    label={translate("password")}
                    fullWidth={true}
                    onChange={(event) => handleChange(data, setData, event.target.value, "password")}
                    type="password"
                    value={data.password.value} />
            </Grid>
            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={verifyLogin}>{translate("loginButtonText")}</Button>
            </Grid>

            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <Link to="/signup" style={styles.link}>{translate("registerUserText")}</Link>
            </Grid>
        </Grid>
    </Box>
};

const styles = {
    box: {
        height: '100vh',
        alignContent: 'center'
    },
    loginText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textFieldContainer: 4,
        textAlign: 'center',
        color: 'var(--primary-color)'
    },
    link: {
        textDecoration: 'none'
    },
    centerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxAdjustment: {
        padding: 2
    },
    textFieldContainer: {
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        minWidth: '75%',
        maxWidth: '100%'
    },

}

export default SignIn;