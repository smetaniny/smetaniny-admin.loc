import axios from 'axios';
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'
import RawTool from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Checklist from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import ChangeFontSize from '@quanzo/change-font-size'
import Underline from '@editorjs/underline';

export const EDITOR_JS_TOOLS = (filePath) => ({
    table: Table,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
    code: Code,
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: '/',
        }
    },
    image: {
        class: ImageTool,
        config: {
            uploader: {
                uploadByFile: async (file) => {
                    // Создание объект FormData
                    const formData = new FormData();
                    // Добавление файл в FormData
                    formData.append('file', file);
                    // Отправьте файл на сервер с помощью Axios или другой HTTP-библиотеки
                    const response = await axios.post(`/api/admin/files/${filePath}`, formData);
                    //Получите URL загруженного файла из ответа сервера
                    const {file: uploadedFile} = response.data;
                    // Верните объект с данными для изображения
                    return {
                        success: 1,
                        file: {
                            url: uploadedFile,
                        },
                    };
                },
            },
        },
    },
    raw: RawTool,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    underline: Underline,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    btn: {
        class: ChangeFontSize,
        config: {
            cssClass: "btn-content",
            buttonText: "Кнопка"
        }
    },
    plus10percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus10pc",
            buttonText: "1.1em"
        }
    },
    plus20percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus20pc",
            buttonText: "1.2em"
        }
    },
    plus30percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus30pc",
            buttonText: "1.3em"
        }
    },
    plus40percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus40pc",
            buttonText: "1.4em"
        }
    },
    plus50percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus50pc",
            buttonText: "1.5em"
        }
    },
    plus60percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus60pc",
            buttonText: "1.6em"
        }
    },
    plus70percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus70pc",
            buttonText: "1.7em"
        }
    },
    plus80percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus80pc",
            buttonText: "1.8em"
        }
    },
    plus90percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus90pc",
            buttonText: "1.9em"
        }
    },
    plus100percent: {
        class: ChangeFontSize,
        config: {
            cssClass: "plus100pc",
            buttonText: "2em"
        }
    }
});

export default EDITOR_JS_TOOLS;
