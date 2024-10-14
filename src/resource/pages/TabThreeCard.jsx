// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { TextInput } from "react-admin";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const FileUploader = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Передаем список принятых файлов родительскому компоненту
      onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Перетащите файлы сюда...</p>
      ) : (
        <p>Перетащите файлы сюда или щелкните, чтобы выбрать файлы</p>
      )}
    </div>
  );
};

// Добавление валидации пропсов для FileUploader
FileUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

const TabThreeCard = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log("selectedFiles", selectedFiles);
  const handleFileUpload = (files) => {
    // Обрабатываем загруженные файлы
    setSelectedFiles(files);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              source="og_title"
              label="Метатег Open Graph title (отображаться при расшаривании данной страницы в социальных сетях)"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="og_description"
              label="Метатег Open Graph description (отображаться при расшаривании данной страницы в социальных сетях)"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="og_image"
              label="Метатег Open Graph image (отображаться при расшаривании данной страницы в социальных сетях)"
              multiline
              fullWidth
            />

            <FileUploader onFileUpload={handleFileUpload} />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="twitter_title"
              label="Заголовок для Twitter"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="twitter_description"
              label="Описание для Twitter"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              source="twitter_image"
              label="Изображение для Twitter"
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabThreeCard;
