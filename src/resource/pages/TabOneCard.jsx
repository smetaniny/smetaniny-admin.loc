// import React from 'react';
// import {Grid} from "@mui/material";
// import TextInputId from "@/Pages/Admin/Resource/Pages/TextInputId";
// import {
//     AutocompleteInput,
//     NumberInput,
//     ReferenceInput,
//     TextInput,
//     SelectInput, required, useRecordContext,
// } from "react-admin";
// import ParentInput from "@/Pages/Admin/Resource/Pages/ParentInput";
// import ResourceLinkField from "@/Pages/Admin/Resource/Pages/ResourceLinkField";
// import {useController} from "react-hook-form";
// import {createReactEditorJS} from 'react-editor-js';
// import {EDITOR_JS_TOOLS} from "@/Pages/Admin/tools";
//
// const ReactEditorJS = createReactEditorJS();
//
// const TabOneCard = ({error, flag, source, ...rest}) => {
//     const record = useRecordContext();
//
//     const Redactor = ({record, filePath, ...props}) => {
//         if (record.content_js === "null") {
//             record.content_js = null;
//         }
//         const editorInstanceRef = React.useRef(null);
//         const {source, ...rest} = props;
//         const {field} = useController({name: source});
//         const defaultValue = React.useMemo(() => JSON.parse(record?.content_js || '{}'), [record?.content_js]);
//
//         const handleEditorSave = async () => {
//             if (editorInstanceRef.current) {
//                 const savedData = await editorInstanceRef.current.save();
//                 field.onChange(savedData);
//             }
//         };
//
//
//         const handleInitialize = (instance) => {
//             editorInstanceRef.current = instance;
//         };
//
//         return (
//             <div className="reactEditorJS">
//                 <h2>Редактор CKEditor</h2>
//                 <ReactEditorJS
//                     defaultValue={defaultValue}
//                     tools={EDITOR_JS_TOOLS(filePath)}
//                     onInitialize={handleInitialize}
//                     onChange={handleEditorSave}
//                     {...rest}
//                 />
//             </div>
//         );
//     };
//
//     return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} sm={12}>
//                 <Grid container spacing={2}>
//                     {flag === 'edit' && <ResourceLinkField source="id" />}
//                     <TextInputId error={error} flag={flag} fullWidth />
//                     <Grid item xs={12}>
//                         <TextInput source="menutitle"
//                                    label="Пункт меню (для краткого заголовка в меню)"
//                                    fullWidth
//                         />
//                         {error && <div className="error-text">{error.menutitle}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextInput source="title"
//                                    label="Метатег title"
//                                    multiline
//                                    fullWidth />
//                         {error && <div className="error-text">{error.title}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextInput source="description"
//                                    label="Метатег description"
//                                    multiline
//                                    fullWidth />
//                         {error && <div className="error-text">{error.description}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextInput source="alias"
//                                    label="Псевдоним (оставьте пустым для автогенерации)"
//                                    fullWidth />
//                         {error && <div className="error-text">{error.alias}</div>}
//                     </Grid>
//                     <ParentInput error={error} flag={flag} />
//                     <Grid item xs={12}>
//                         <NumberInput
//                             source="menuindex"
//                             label="Позиция в меню (оставьте пустым для автогенерации)"
//                             fullWidth
//                             step={1}
//                             min={0}
//                         />
//                         {error && <div className="error-text">{error.menuindex}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <SelectInput
//                             source="robots"
//                             label="Инструкции для поисковых роботов по индексации и индексации ссылок на странице"
//                             choices={[
//                                 {
//                                     id: 'index,follow',
//                                     name: 'Индексировать страницу и следовать по ссылкам (index,follow)'
//                                 },
//                                 {
//                                     id: 'noindex,nofollow',
//                                     name: 'Не индексировать страницу и не следовать по ссылкам (noindex,nofollow)'
//                                 },
//                                 {
//                                     id: 'index,nofollow',
//                                     name: 'Индексировать страницу, но не следовать по ссылкам (index,nofollow)'
//                                 },
//                                 {
//                                     id: 'noindex,follow',
//                                     name: 'Не индексировать страницу, но следовать по ссылкам (noindex,follow)'
//                                 },
//                             ]}
//                             validate={[required()]}
//                             defaultValue="noindex,nofollow"
//                             fullWidth
//                         />
//                         {error && <div className="error-text">{error.robots}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <NumberInput source="sitemap_priority"
//                                      step={0.1}
//                                      min={0}
//                                      max={1}
//                                      label="Приоритет страницы в файле sitemap.xml (от 0 до 1, где 1 - наибольший приоритет)"
//                                      defaultValue={0.5}
//                                      fullWidth />
//                         {error && <div className="error-text">{error.sitemap_priority}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <SelectInput
//                             source="sitemap_frequency"
//                             label="Частота обновления страницы для поисковых роботов"
//                             validate={required()}
//                             choices={[
//                                 {id: 'always', name: 'Всегда'},
//                                 {id: 'hourly', name: 'Ежечасно'},
//                                 {id: 'daily', name: 'Ежедневно'},
//                                 {id: 'weekly', name: 'Еженедельно'},
//                                 {id: 'monthly', name: 'Ежемесячно'},
//                                 {id: 'yearly', name: 'Ежегодно'},
//                                 {id: 'never', name: 'Никогда'},
//                             ]}
//                             defaultValue="monthly"
//                             fullWidth />
//                         {error && <div className="error-text">{error.sitemap_frequency}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextInput source="canonical_url"
//                                    label="URL-адрес канонической версии страницы"
//                                    fullWidth />
//                         {error && <div className="error-text">{error.canonical_url}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <ReferenceInput
//                             label="Шаблон"
//                             reference="templates"
//                             source="template_id"
//                         >
//                             <AutocompleteInput optionText="name" />
//                         </ReferenceInput>
//                         {error &&
//                             <div className="error-text">{error.template_id}</div>}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <ReferenceInput
//                             label="Категории"
//                             reference="categories"
//                             source="category_id"
//                         >
//                             <AutocompleteInput optionText="name" />
//                         </ReferenceInput>
//                         {error &&
//                             <div className="error-text">{error.category_id}</div>}
//                     </Grid>
//                     <Grid item xs={12}
//                           style={{
//                               border: "solid 1px #efe8e8",
//                               marginLeft: "18px",
//                               borderRadius: "15px"
//                           }}
//                     >
//                         <Redactor
//                             record={record}
//                             source="content_js"
//                             filePath={`pages;${record.id};redactor`}
//                             {...rest}
//                         />
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default TabOneCard;
