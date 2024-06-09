import {DateInput, Filter, SearchInput} from "react-admin";

/**
 * Компонент для фильтрации
 *
 * @param {object} props Пропсы компонента.
 * @returns {JSX.Element} Компонент фильтра.
 */
const ListFilter = (props) => {
    // Разбираем пропсы, используя де структуризацию. Если filterValues не заданы в пропсах, то используем пустой объект по умолчанию.
    const {filterValues = {}, ...restProps} = props;

    // Возвращаем компонент Filter с настроенными SearchInput и DateInput компонентами.
    return (
        <Filter {...restProps}>
            {/* Поле для поиска */}
            <SearchInput
                source={`content`}
                alwaysOn
            />
            {/* Поле для выбора даты начала */}
            <DateInput label={`От`} source="date_start" alwaysOn />
            {/* Поле для выбора даты окончания */}
            <DateInput label={`До`} source="date_end" alwaysOn />
        </Filter>
    );
};

export default ListFilter;
