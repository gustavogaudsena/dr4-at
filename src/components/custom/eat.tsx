import React from "react";
import { Avatar, Button, DateTimePicker, Grid, TextField, Typography } from "..";
import { adjustDateTimeForTimezone, handleInputChange } from "../../utils/core";
import { selectItem } from "../../utils/action";
import { useAppContext } from "../../Context";
import mamadeira from '../../assets/images/mamadeira.png';
import customStyles from "../../utils/customStyles";

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
                <Button fullWidth variant={data.selector === 1 ? "contained" : "outlined"} onClick={() => { selectItem(1, "selector", data, setData) }}>{translate("mamadeira")}</Button>
            </Grid>

            <Grid size={{ xs: 6 }}>
                <Button fullWidth variant={data.selector === 2 ? "contained" : "outlined"} onClick={() => { selectItem(2, "selector", data, setData) }}>{translate("seio")}</Button>
            </Grid>
        </Grid>
        { data.selector === 1 &&
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
            data.selector === 2 &&
            <Grid size={{ xs: 12 }} spacing={2} justifyContent={'center'} container>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.selector === 1 ? "contained" : "outlined"} onClick={() => { selectItem(1, "selector", data, setData) }}>
                        {translate("diaper-wet")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.selector === 2 ? "contained" : "outlined"} onClick={() => { selectItem(2, "selector", data, setData) }}>
                        {translate("diaper-dirty")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.selector === 3 ? "contained" : "outlined"} onClick={() => { selectItem(3, "selector", data, setData) }}>
                        {translate("diaper-both")}
                    </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Button fullWidth variant={data?.selector === 4 ? "contained" : "outlined"} onClick={() => { selectItem(4, "selector", data, setData) }}>
                        {translate("diaper-clean")}
                    </Button>
                </Grid >
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

// import { useEffect } from "react";
// import { Button, DateTimePicker, Grid, TextField } from "..";
// import { adjustDateTimeForTimezone, handleInputChange, selectItem } from "../../utils/core";

// const Eat = ({ data, setData, translate }) => {
//     useEffect(() => {
//         setData({...data, 'action_type': 2})  
//     }, [])
    
//     return <Grid container={true} spacing={2}>
//               <Grid item={true} size={{ xs: 12 }}>
//                   <Button color={data.type === 1 ? "secondary" : "primary"} onClick={() => { 
//                     handleInputChange('side', null, data, setData);
//                     handleInputChange('end_date', null, data, setData);
//                     selectItem(1, "type", data, setData);
//                   }}>{translate("eat-bottle")}</Button>
//                   <Button color={data.type === 2 ? "secondary" : "primary"} onClick={() => {
//                     handleInputChange('quantity', null, data, setData); 
//                     selectItem(2, "type", data, setData);
//                   }}>{translate("eat-bosom")}</Button>
//               </Grid>
//               <Grid item={true} size={{ xs: 12 }}>
//                   <DateTimePicker
//                       value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
//                       label={data.type === 1 ? translate("data-hour") : translate("data-hour-start")}
//                       name="start_date"
//                       fullWidth={true}
//                       ampm={false}
//                       format="DD/MM/YYYY HH:mm"
//                       onChange={(value) => {handleInputChange('start_date', new Date(value.toString()), data, setData)}}
//                   />
//               </Grid>
//               {
//                 data.type === 2 ? <Grid item={true} size={{ xs: 12 }}>
//                                     <DateTimePicker
//                                       value={data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null}
//                                       label={translate("data-hour-end")}
//                                       name="end_date"
//                                       fullWidth={true}
//                                       ampm={false}
//                                       format="DD/MM/YYYY HH:mm"
//                                       onChange={(value) => {handleInputChange('end_date', new Date(value.toString()), data, setData)}}
//                                     />
//                                   </Grid> : null
//               }
//               {
//                 data.type === 1 ? <Grid item={true} size={{ xs: 12 }}>
//                                     <TextField
//                                       value={data?.quantity ? data.quantity : ""}
//                                       label={translate("quantity") + " (ml)"}
//                                       onChange={(event) => {handleInputChange('quantity', event.target.value, data, setData)}}
//                                       name="quantity"
//                                       type={"number"}
//                                       fullWidth={true}/>
//                                   </Grid> : <Grid item={true} size={{ xs: 12 }}>
//                                               <Button color={data.side === 1 ? "secondary" : "primary"} onClick={() => { selectItem(1, "side", data, setData)}}>{translate("left")}</Button>
//                                               <Button color={data.side === 2 ? "secondary" : "primary"} onClick={() => { selectItem(2, "side", data, setData)}}>{translate("right")}</Button>
//                                               <Button color={data.side === 3 ? "secondary" : "primary"} onClick={() => { selectItem(3, "side", data, setData)}}>{translate("both")}</Button>
//                                           </Grid>
//               }
//               <Grid item={true} size={{ xs: 12 }}>
//                 <TextField
//                   value={data?.observation ? data.observation : ""}
//                   label={translate("observation")}
//                   onChange={(event) => {handleInputChange('observation', event.target.value, data, setData)}}
//                   name="observation"
//                   rows={6}
//                   fullWidth={true}
//                   multiline={true}/>
//               </Grid>
//             </Grid>
// }

// export default Eat;