import React from "react";
import { Avatar, Button, DateTimePicker, Grid, TextField } from "..";
import { adjustDateTimeForTimezone, handleInputChange } from "../../utils/core";
import { selectItem } from "../../utils/action";
import { useAppContext } from "../../Context";
import mamadeira from '../../assets/images/mamadeira.png';

interface IEat {
    data: any,
    setData: (...args: any) => void
}

const Eat: React.FC<IEat> = ({ data, setData }) => {
    const { translate } = useAppContext()

    return <Grid container={true} spacing={2}>
         <Grid container size={{ xs: 12 }} justifyContent={'center'} alignItems={'center'}>
            <Grid >
                <Avatar sx={{...styles.avatar,}} src={mamadeira} />
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
        <Grid size={{ xs: 12 }} spacing={2} justifyContent={'center'} container>
            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 1 ? "contained" : "outlined"} onClick={() => { selectItem(1, "selector", data, setData) }}>{translate("bottle")}</Button>
            </Grid>

            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector == 2 ? "contained" : "outlined"} onClick={() => { selectItem(2, "selector", data, setData) }}>{translate("breast")}</Button>
            </Grid>
        </Grid>
        { data.selector == 1 &&
            <Grid size={{ xs: 12 }}>
                    <TextField
                        value={data?.quantity ? data.quantity : ""}
                        label={translate("quantity") + " (ml)"}
                        onChange={(event) => {handleInputChange('quantity', event.target.value, data, setData)}}
                        name="quantity"
                        type={"number"}
                        fullWidth={true}/>
            </Grid>
        }
        {
            data.selector == 2 &&
            <Grid size={{ xs: 12 }} spacing={2} justifyContent={'center'} container>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.side == 1 ? "contained" : "outlined"} onClick={() => { selectItem(1, "side", data, setData) }}>
                        {translate("right")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.side == 2 ? "contained" : "outlined"} onClick={() => { selectItem(2, "side", data, setData) }}>
                        {translate("left")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.side == 3 ? "contained" : "outlined"} onClick={() => { selectItem(3, "side", data, setData) }}>
                        {translate("both")}
                    </Button>
                </Grid>
               
            </Grid >
        }
       

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


const styles = {
    avatar: {
        width: '75px',
        height: '75px'
    },
}

export default Eat;