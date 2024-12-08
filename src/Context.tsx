import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { Alert, Grid, Snackbar } from "./components";
import { createClient } from "@supabase/supabase-js";
import { AlertColor } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AppProviderInterface {
    children: ReactNode
}

type ShowAlertMessageInterface = (options: { message: string, severity?: AlertColor, variant?: 'standard' | 'filled' | 'outlined', timeout?: number }) => void

interface AppContextInterface {
    changeLanguage: (lang: 'pt' | 'en' | 'es') => void,
    showSnackBar: (message: string) => void,
    showAlertMessage: ShowAlertMessageInterface
    SUPABASE: any,
    translate: (text: string) => string
}

const AppContext = createContext<AppContextInterface | null >(null)

const SUPABASE = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const AppProvider: React.FC<AppProviderInterface> = ({ children }) => {
    const { t: translate, i18n } = useTranslation();
    const snackbarTimeout = 5000;

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const [alertMessage, setAlertMessage] = useState<String>("");
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info');
    const [alertVariant, setAlertVariant] = useState<'standard' | 'filled' | 'outlined'>('filled');

    const showSnackBar = (message: string) => {
        setSnackMessage(message);
        setSnackOpen(true);
    }

    const closeSnackBar = () => {
        setSnackMessage("");
        setSnackOpen(false);
    }

    const showAlertMessage: ShowAlertMessageInterface = ({ message, severity = 'info', variant = 'filled', timeout = 5000 }) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertVariant(variant);

        setTimeout(() => {
            setAlertMessage("");
        }, timeout);
    }

    const changeLanguage = (lang: 'pt' | 'en' | 'es') => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    }

    const sharedStated = {
        changeLanguage,
        showSnackBar,
        showAlertMessage,
        SUPABASE,
        translate,
    }

    useEffect(() => {
        const currentLanguage = localStorage.getItem("language") as 'pt' | 'en' | 'es' ?? 'pt';
        changeLanguage(currentLanguage)
    }, [])

    return (
        <div className="app-background">
            <AppContext.Provider value={sharedStated} >
                {children}
                <Snackbar
                    autoHideDuration={snackbarTimeout}
                    onClose={closeSnackBar}
                    open={snackOpen}
                    message={snackMessage}
                />
                {alertMessage &&
                    <Grid container={true}
                        sx={style.alertContainer}>
                        <Grid size={{ xs: 12 }}>
                            <Alert variant={alertVariant} severity={alertSeverity}>{alertMessage}</Alert>
                        </Grid>
                    </Grid>
                }
            </AppContext.Provider >
        </div>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

const style = {
    alertContainer: { position: 'fixed', left: 2, bottom: 2, width: '100%', padding: 2 }
}
export default AppProvider