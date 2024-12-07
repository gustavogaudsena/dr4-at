import React, { useEffect } from "react";
import { Avatar, Button, DateTimePicker, Grid, TextField, Typography } from "..";
import { adjustDateTimeForTimezone, handleInputChange } from "../../utils/core";
import { selectItem } from "../../utils/action";
import { useAppContext } from "../../Context";
import fralda from '../../assets/images/fralda.png';
import customStyles from "../../utils/customStyles";

interface IDiaper {
    data: any,
    setData: (...args: any) => void
}

const Diaper: React.FC<IDiaper> = ({ data, setData }) => {
    const { translate } = useAppContext()

    useEffect(() => {
        console.log(data)

    }, [])
    return <Grid container={true} spacing={2}>
        <Grid container size={{ xs: 12 }} justifyContent={'center'} alignItems={'center'}>
            <Grid >
                <Avatar sx={{ ...customStyles.avatar, }} src={fralda} />
            </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
            <DateTimePicker
                value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
                label={translate("start_date")}
                name="start_date"
                onChange={(value) => { value && handleInputChange('start_date', new Date(value.toString()), data, setData) }}
            />
        </Grid>
        <Grid size={{ xs: 12 }} spacing={2} justifyContent={'center'} container>
            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 1 ? "contained" : "outlined"} onClick={() => { selectItem(1, "selector", data, setData) }}>
                    {translate("diaper-wet")}
                </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 2 ? "contained" : "outlined"} onClick={() => { selectItem(2, "selector", data, setData) }}>
                    {translate("diaper-dirty")}
                </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 3 ? "contained" : "outlined"} onClick={() => { selectItem(3, "selector", data, setData) }}>
                    {translate("diaper-both")}
                </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 4 ? "contained" : "outlined"} onClick={() => { selectItem(4, "selector", data, setData) }}>
                    {translate("diaper-clean")}
                </Button>
            </Grid >
        </Grid >
        <Grid size={{ xs: 12 }}>
            <TextField
                value={data?.observation ? data.observation : ""}
                label={translate("observation")}
                onChange={(event) => { handleInputChange('observation', event.target.value, data, setData) }}
                name="observation"
                rows={6}
                fullWidth={true}
                multiline={true}
            />
        </Grid>
    </Grid >
}


export default Diaper;