import React from "react";
import { Avatar, DateTimePicker, Grid, TextField } from "..";
import { adjustDateTimeForTimezone, handleInputChange } from "../../utils/core";
import { useAppContext } from "../../Context";
import sono from '../../assets/images/sono.png';
import customStyles from "../../utils/customStyles";


interface ISleep {
    data: any,
    setData: (...args: any) => void
}

const Sleep: React.FC<ISleep> = ({ data, setData }) => {
    const { translate } = useAppContext()

    return <Grid container={true} spacing={2}>
         <Grid container size={{ xs: 12 }} justifyContent={'center'} alignItems={'center'}>
            <Grid >
                <Avatar sx={{ ...customStyles.avatar, }} src={sono} />
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
        <Grid size={{ xs: 12 }}>
            <DateTimePicker
                value={data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null}
                label={translate("end_date")}
                name="end_date"
                onChange={(value) => { value && handleInputChange('end_date', new Date(value.toString()), data, setData) }}
            />
        </Grid>
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
    </Grid>
}


export default Sleep;