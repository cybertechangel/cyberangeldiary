export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || '/api',
    TIMEOUT: 10000,
};

export const PAGINATION = {
    ARTICLES_PER_PAGE: 4,
};

export const CATEGORIES = {
    FASHION: 'fashion',
    BEAUTY: 'beauty',
};

export const ROUTES = {
    HOME: '/',
    FASHION: '/fashion',
    BEAUTY: '/beauty',
    LOGIN: '/login',
    ADMIN: '/admin',
};
