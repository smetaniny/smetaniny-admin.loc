// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Grid} from "@mui/material";
import {
    BooleanInput,
    DateInput,
    TextInput
} from "react-admin";

const TabFourCard = () => {
    return (
        <Grid container spacing={1} >
            <Grid item xs={12} sm={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <BooleanInput source="is_published"
                                      label="Опубликовать"
                                      format={v => v === 1}
                                      parse={v => v ? 1 : 0} />

                    </Grid>
                    <Grid item xs={12}>
                        <BooleanInput source="is_visible_url"
                                      label="Участвует в URL"
                                      format={v => v === 1}
                                      parse={v => v ? 1 : 0} />

                    </Grid>
                    <Grid item xs={12}>
                        <DateInput
                            label="Дата и время публикации (оставить пустым, если страница должна быть всегда доступна)"
                            source={`published_at`}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DateInput
                            label="Дата и время снятия с публикации (оставить пустым, если страница должна быть всегда доступна)"
                            source={`unpublished_at`}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="css"
                                   label="CSS-код (будет помещен в header для конкретной страницы)"
                                   multiline={true}
                                   fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput source="js"
                                   label="JavaScript-код (будет помещен в footer для конкретной страницы)"
                                   multiline={true}
                                   fullWidth />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabFourCard;
