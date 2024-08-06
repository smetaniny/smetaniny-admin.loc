// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRecordContext} from "react-admin";
import {URL_API} from "../../settings";

const ResourceLinkField = () => {
    const record = useRecordContext();
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(URL_API + '/urlGet', {alias: record.alias});
                setUrl(response.data);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, [record.alias]);

    if (record.is_visible_url !== 1 || record.is_published !== 1) {
        return (
            <div style={{
                textTransform: 'unset',
                marginLeft: 20,
                color: '#181818',
                fontSize: '18px',
                lineHeight: '1.5',
                textDecoration: 'none',
                width: "100%",
                textAlign: "right"
            }}
            >
               Для просмотра нужна публикация и участие в url
            </div>
        );
    }

    return (
        <Link
            to={`${location.origin}${url}`}
            target="_blank"
            style={{
                textTransform: 'unset',
                marginLeft: 20,
                color: '#181818',
                fontSize: '18px',
                lineHeight: '1.5',
                textDecoration: 'none',
                width: "100%",
                textAlign: "right"
            }}
        >
            Просмотр страницы
        </Link>
    );
};

export default ResourceLinkField;
