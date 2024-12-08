import React, { useState } from "react"
import { useAppContext } from "../../Context";
import { Avatar, Box, Button, Grid, TextField, Typography } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/baby-logo.png';
import { handleChange } from "../../utils/core";
import authenticator from "../../services/authenticator";

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: {
            value: "",
            error: false,
            helperText: null
        },
        password: {
            value: "",
            error: false,
            helperText: null
        },
        confirmPassword: {
            value: "",
            error: false,
            helperText: null
        },
    })

    const { SUPABASE, translate, showAlertMessage } = useAppContext()

    const registrar = async () => {
        if (data.confirmPassword.value !== data.password.value) {
            setData((prev: any) => {
                return {
                    ...prev,
                    password: {
                        ...prev.password,
                        error: true
                    },
                    confirmPassword: {
                        ...prev.confirmPassword,
                        error: true
                    }
                }
            })
            showAlertMessage({ message: translate("noMatchPassword"), severity: 'error' });
            return
        } else {
            setData((prev: any) => {
                return {
                    ...prev,
                    password: {
                        ...prev.password,
                        error: false
                    },
                    confirmPassword: {
                        ...prev.confirmPassword,
                        error: false
                    }
                }
            })
        }
        let { error } = await authenticator.signUp(data.email.value, data.password.value, SUPABASE);
        if (error?.message) {
            showAlertMessage({ message: translate("registerError"), severity: 'error' });
        } else if (!error) {
            showAlertMessage({ message: translate("registerSuccess"), severity: 'success' });
            navigate('/signin')
        }
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
                    value={data.password.value}
                    error={data.password.error}
                />
            </Grid>
            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <TextField
                    label={translate("confirmPassword")}
                    fullWidth={true}
                    onChange={(event) => handleChange(data, setData, event.target.value, "confirmPassword")}
                    type="password"
                    value={data.confirmPassword.value}
                    error={data.confirmPassword.error}
                />
            </Grid>
            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={registrar}>{translate("registerButtonText")}</Button>
            </Grid>

            <Grid
                sx={styles.textFieldContainer}
                size={{ xs: 12 }}>
                <Link to="/signin" style={styles.link}>{translate("loginLinkText")}</Link>
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

export default SignUp;