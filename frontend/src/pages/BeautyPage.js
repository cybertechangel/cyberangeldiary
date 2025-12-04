import React from 'react';
import CategoryPage from '../components/CategoryPage';
import { CATEGORIES } from '../config/constants';

const BeautyPage = () => {
    return (
        <CategoryPage 
            category={CATEGORIES.BEAUTY}
            heroImage="/img/hero-beautypage.gif"
            title="Beauty Articles"
        />
    );
};

export default BeautyPage;