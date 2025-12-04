import React from 'react';
import CategoryPage from '../components/CategoryPage';
import { CATEGORIES } from '../config/constants';

const FashionPage = () => {
    return (
        <CategoryPage 
            category={CATEGORIES.FASHION}
            heroImage="/img/hero-homepage.gif"
            title="Fashion Articles"
        />
    );
};

export default FashionPage;