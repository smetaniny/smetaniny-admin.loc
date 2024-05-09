export const getPermissions = () => {
    const configString = sessionStorage.getItem('config');
    return JSON.parse(configString);
}

// Установка объекта config в sessionStorage
export const setPermissions = (config) => {
    sessionStorage.setItem('config', JSON.stringify(config));
}
