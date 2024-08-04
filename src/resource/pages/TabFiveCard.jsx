// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import React, {useState} from 'react';
// import {Grid} from "@mui/material";
// import {FormDataConsumer, useRecordContext} from "react-admin";
// import TvAceEditor from "@/Pages/Admin/Resource/Pages/TvAceEditor";
// import {ImageInput} from 'react-admin';
//
//
// const TabFiveCard = ({error, flag, ...props}) => {
//     const {source, ...rest} = props;
//     const record = useRecordContext();
//     return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} sm={12}>
//                 <Grid container spacing={2}>
//                     <FormDataConsumer>
//                         {({formData}) => {
//                             if (!formData.with_templates) return null;
//                             return (
//                                 <>
//                                     {formData.with_templates.with_tv_params_template.map((el, index) => {
//                                         if (el.pivot.page_id === formData.id) {
//                                             switch (el.input_type) {
//                                                 case 'AceEditor':
//                                                     return <Grid key={el.id} item xs={12}>
//                                                         <h2>{el.caption}</h2>
//                                                         <TvAceEditor
//                                                             el={el}
//                                                             label={el.name}
//                                                             source={`with_templates.with_tv_params_template[${index}].pivot.value`}
//                                                             {...rest}
//                                                         />
//                                                     </Grid>;
//                                                 case 'ImageInput':
//                                                     const [loading, setLoading] = useState(false);
//                                                     const handleImageChange = async (file) => {
//                                                         if (file.name) {
//                                                             setLoading(true);
//                                                             // Создайте объект FormData
//                                                             const fileData = new FormData();
//                                                             // Добавьте файл в FormData
//                                                             fileData.append('file', file);
//
//                                                             try {
//                                                                 const response = await axios.post(`/api/admin/files/pages;${record.id};imageInput`, fileData);
//                                                                 //Получите URL загруженного файла из ответа сервера
//                                                                 const {file: uploadedFile} = response.data;
//                                                                 // Извлекаем имя файла и записываем только его в formData
//                                                                 formData.with_templates.with_tv_params_template[index].pivot.value = uploadedFile;
//                                                             } catch (error) {
//                                                                 console.log('error', error);
//                                                             } finally {
//                                                                 setLoading(false);
//                                                             }
//                                                         }
//                                                     };
//
//                                                     return <Grid key={el.id} item xs={12}>
//                                                         <h2>{el.caption}</h2>
//                                                         <ImageInput
//                                                             source={`with_templates.with_tv_params_template[index].pivot.value`}
//                                                             label={el.name}
//                                                             accept="image/png, image/jpeg"
//                                                             onChange={(e) => handleImageChange(e)}
//                                                         >
//                                                         </ImageInput>
//                                                         {el.pivot.value && (
//                                                             loading ? <p>Загрузка...</p> : <p><img
//                                                                 width={200}
//                                                                 height={100}
//                                                                 src={formData.with_templates.with_tv_params_template[index].pivot.value}
//                                                                 alt="Предварительный просмотр"
//                                                             /></p>
//                                                         )}
//                                                     </Grid>;
//                                                 default:
//                                                     return null;
//                                             }
//                                         }
//                                     })}
//                                 </>
//                             );
//                         }}
//                     </FormDataConsumer>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default TabFiveCard;
//
// // {"rawFile":{"path":"kandinsky-download-1689303809703.png"},"src":"blob:http:\/\/smetaniny\/585ef6d2-8465-4feb-bbfb-2eee90944a7b","title":"kandinsky-download-1689303809703.png"}
