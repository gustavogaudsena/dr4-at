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
        setData(result);

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
            showAlertMessage({ message: `Item ${id ? "editado" : "criado"} com sucesso!!!`, severity: "success" });
            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (err) {
            showAlertMessage({ message: `Erro ao ${id ? "editar" : "criar"} item: ` + err, severity: "error" });
        }
    }

    useEffect(() => {
        if (params && params.id) {
            loadData(params.id);
        }
    }, [])


    return (
        <>
            <AppBar title={translate(type!)} firstIcon={{ icon: <ArrowBackIos />, handleClick: () => navigate('/') }} secondIcon={{ icon: <></>, handleClick: () => navigate('settings') }} />
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

// const Form = () => {
//     const { translate, showAlertMessage } = useAppContext();
//     const navigate = useNavigate();

//     const params = useParams();
//     const actionType = params.type;
//     const id = params.id;

//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(false);

//     const getForm = (actionType) => {
//         switch(actionType) {
//             case "1":
//             return <Sleep data={data} setData={setData} translate={translate}/>;

//             case "2":
//             return <Eat data={data} setData={setData} translate={translate}/>;

//             case "3":
//             return <Diaper data={data} setData={setData} translate={translate}/>;

//             default:
//             return <Eat data={data} setData={setData} translate={translate}/>;
//         }
//     }

//     const loadData = async (id) => {
//         if(id) {
//             const result = await get("action_students", [{field: "id", value: id }, {field: "user_id", value: getUser().id }]);
//             setData(result);
//         }
//     }

//     useEffect(() => {
//         if (params && params.id) {
//             loadData(params.id);
//         }
//     }, [])

//     return  <>
//                 <AppBar title={translate(getTitle(actionType))} id={id} _delete={() => {
//                     const _confirm = confirm("Deseja mesmo deletar este item?");
//                     if(_confirm) {
//                         drop(id);
//                         showAlertMessage("Item deletado com sucesso!!!", "success");
//                         setTimeout(() => {
//                             navigate("/");
//                         }, 3000);
//                     } else{
//                         showAlertMessage("A��o cancelada", "error");
//                     }
//                 }}/>
//                 <Grid container={true} spacing={2} sx={{
//                 marginTop: '1em',
//                 padding: '1em',
//                 height: 'calc(100vh - 72px)'
//                 }}>
//                     <Grid item={true} size={{ xs: 12 }}>
//                         { getForm(actionType) }
//                         <Button
//                             loading={loading}
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             onClick={async () => {
//                                 try{
//                                     const fields = validateFields(data, actionType);
//                                     if (fields.length === 0) {
//                                         if(id){
//                                             await update("action_students", data, id);
//                                         }else{
//                                             data.user_id = getUser().id;
//                                             await save("action_students", data);
//                                         }
//                                         showAlertMessage(`Item ${id ? "editado" : "criado"} com sucesso!!!`, "success");
//                                         setTimeout(() => {
//                                             navigate("/");
//                                         }, 3000);
//                                     } else {
//                                         showAlertMessage(`Os campos ${fields.join(", ")} s�o obrigat�rio`, "warning");
//                                     }
//                                 } catch(err){
//                                     showAlertMessage(`Erro ao ${id ? "editar" : "criar"} item: ` + err, "error");
//                                 }
//                             }}
//                             sx={{ 
//                                 mt: 3,
//                                 mb: 2,
//                                 position: 'absolute',
//                                 bottom: 0,
//                                 left: 0,
//                                 borderRadius: '0 !important',
//                                 margin: 0,
//                             }}
//                         >
//                             {translate('save')}
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </>
// };

// export default Form;