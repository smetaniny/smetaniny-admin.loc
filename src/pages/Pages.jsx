const user = JSON.parse(sessionStorage.getItem('user'));
import {default as PagesList} from '../components/pages/PagesList';
import {default as PagesCreate} from '../components/pages/PagesCreate';
import {default as PagesEdit} from '../components/pages/PagesEdit';

export default {
    list: user?.role?.permissions?.some((el) => el.name === 'PagesList') ? PagesList : null,
    create: user?.role?.permissions?.some((el) => el.name === 'PagesCreate') ? PagesCreate : null,
    edit: user?.role?.permissions?.some((el) => el.name === 'PagesEdit') ? PagesEdit : null,
};
