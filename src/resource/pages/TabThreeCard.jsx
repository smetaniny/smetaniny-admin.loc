import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {TextInput,FileInput, FileField} from "react-admin";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFileUpload }) => {
    const onDrop = useCallback((acceptedFiles) => {
        // Передаем список принятых файлов родительскому компоненту
        onFileUpload(acceptedFiles);
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Перетащите файлы сюда...</p>
            ) : (
                <p>Перетащите файлы сюда или щелкните, чтобы выбрать файлы</p>
            )}
        </div>
    );
};


const TabThreeCard = ({error, flag}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileUpload = (files) => {
     console.log('files', files);
        // Обрабатываем загруженные файлы
        setSelectedFiles(files);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextInput source="og_title"
                                   label="Метатег Open Graph title (отображаться при расшаривании данной страницы в социальных сетях)"
                                   multiline
                                   fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="og_description"
                                   label="Метатег Open Graph description (отображаться при расшаривании данной страницы в социальных сетях)"
                                   multiline
                                   fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="og_image"
                                   label="Метатег Open Graph image (отображаться при расшаривании данной страницы в социальных сетях)"
                                   multiline
                                   fullWidth />

                        <FileUploader onFileUpload={handleFileUpload} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="twitter_title"
                                   label="Заголовок для Twitter"
                                   multiline
                                   fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="twitter_description"
                                   label="Описание для Twitter"
                                   multiline
                                   fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="twitter_image"
                                   label="Изображение для Twitter"
                                   multiline
                                   fullWidth />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabThreeCard;
