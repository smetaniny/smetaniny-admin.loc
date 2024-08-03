import {default as PagesList} from '../resource/pages/PagesList';
import {default as PagesCreate} from '../resource/pages/PagesCreate';
import {default as PagesEdit} from '../resource/pages/PagesEdit';

export default (permissions = []) => {
    return {
        list: permissions.some((el) => el.name === 'PagesList') ?
            <PagesList permissions={permissions} /> : undefined,
        create: permissions.some((el) => el.name === 'PagesCreate') ?
            <PagesCreate permissions={permissions} /> : undefined,
        edit: permissions.some((el) => el.name === 'PagesEdit') ?
            <PagesEdit permissions={permissions} /> : undefined,
    };
};

