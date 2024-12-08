import { ArrowBackIos } from "@mui/icons-material";
import { AppBar, Eat, Diaper, Sleep, Grid, Button } from "../../components";
import { useAppContext } from "../../Context";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, save, update } from "../../services/supabasedb";
import { getUser } from "../../utils/core";
import customStyles from "../../utils/customStyles";

const Form: React.FC = () => {
    const { translate, showAlertMessage } = useAppContext()
    const navigate = useNavigate()

    const params = useParams();
    const [data, setData] = useState<any>([])
    const id = params.id;
    const type = params.type;


    const getForm = (type: string | undefined) => {
        switch (type) {
            case "sleep":
                return <Sleep data={data} setData={setData} />;

            case "eat":
                return <Eat data={data} setData={setData} />;

            case "diaper":
                return <Diaper data={data} setData={setData} />;

            default:
                return <Eat data={data} setData={setData} />;
        }
    }
    const loadData = async (id: number | string) => {
        if (!id) return
        const result = await get("list_items", [{ field: "id", value: id }, { field: "user_id", value: getUser().id }]);
        if (result) setData(result);
    }

    const handleSubmit = async () => {
        try {
            if (id) {
                await update("list_items", data, id);
            } else {
                data.user_id = getUser().id;
                data.type = type
                save("list_items", data);
            }
            const message = id ? 'editedField' : 'createdField'
            showAlertMessage({ message: translate(message), severity: "success" });
            setTimeout(() => navigate("/"), 1500);
          

        } catch (err) {
            const message = id ? 'editedFieldError' : 'createdFieldError'
            showAlertMessage({ message: translate(message), severity: "error" });
        }
    }

    useEffect(() => {
        if (params && params.id) {
            loadData(params.id);
        }
    }, [])


    return (
        <>
            <AppBar title={translate(type!)} firstIcon={{ icon: <ArrowBackIos />, handleClick: () => navigate('/') }} />
            <Grid container={true} spacing={2} sx={{
                marginTop: '1em',
                padding: '1em',
                height: 'calc(100vh - 72px)'
            }}>
                <Grid>
                    {getForm(params.type)}
                </Grid>
                <Grid style={{...customStyles.centerBox, ...customStyles.alignSelfEnd }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                   
                    >
                        {translate('save')}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}


export default Form;