import React from "react"
import { Alert, Avatar, Box, Button, Card, Checkbox, Container, DatePicker, DateTimePicker, Fab, Grid, IconButton, Snackbar, Switch, Tab, TextField, Typography, } from "../../components";
import { CardContent, FormControlLabel, Tabs } from "@mui/material";
import { GrAppleAppStore } from "react-icons/gr";

const SignIn: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(1);

    const toggleSnackbar = () => setOpen(!open);
    const handleTab = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Box sx={{ p: 2, border: '1px dashed grey' }} >
            <Tabs value={tabValue} onChange={handleTab} sx={{ marginBottom: 2 }}>
                <Tab label="Primeira tab" value={1} />
                <Tab label="Segunda Tab" value={2} />
            </Tabs>

            <Grid container spacing={2}>
                <Grid size={4} alignItems="center">
                    <Box sx={{ p: 1, border: '1px dashed grey' }} >
                        <Avatar alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbbPXnZJ9xOi9zK06VhU8GgKLPr-bpGBJuQ&s" />
                    </Box>
                </Grid>
                <Grid size={8}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h3" component="h3">Typography</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}><Alert>Teste Alerta</Alert></Grid>

                <Container maxWidth='xl'>
                    <FormControlLabel control={<Checkbox size="large" color="secondary" />} label='Teste Checkbox' />
                    <FormControlLabel control={<Switch color="secondary" />} label='Teste Switch' />
                    <TextField variant="outlined" label='Text Field'></TextField>
                </Container>

                <Fab color="primary"><IconButton color="warning"><GrAppleAppStore /></IconButton></Fab>
                <Fab color="primary"><IconButton color="warning"><GrAppleAppStore /></IconButton></Fab>
                <Grid size={12} alignItems="center">
                    <DatePicker />
                    <DateTimePicker />
                </Grid>
                <Grid size={12} alignItems="center">
                    <Button variant="contained" onClick={toggleSnackbar} fullWidth >SignIn</Button>
                </Grid>
            </Grid>
            <Snackbar
                autoHideDuration={3000}
                message="Teste"
                open={open}
                onClose={toggleSnackbar}
            />
        </Box>
    )
}

export default SignIn;