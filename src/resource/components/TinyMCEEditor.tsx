import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { InputProps } from 'react-admin';

interface TinyMCEEditorProps extends InputProps {
    input?: {
        value?: string; // Значение должно быть строкой
        onChange?: (value: string) => void; // Функция для обновления значения
    };
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ input = {} }) => {
    const handleEditorChange = (content: string) => {
        if (input.onChange) {
            input.onChange(content); // Передаем новое значение родительскому компоненту
        }
    };

    return (
        <Editor
            apiKey='' // Замените на ваш API ключ
            value={input.value}
            init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                height: 500,
                content_css: 'https://www.tiny.cloud/css/codepen.min.css',
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TinyMCEEditor;
