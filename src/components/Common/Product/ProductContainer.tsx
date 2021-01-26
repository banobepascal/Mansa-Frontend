import React from 'react';
import { HomePageSectionTwoDataProps } from '../../../data/data';
import ColumnLayout from './Layout.tsx/ColumnLayout';
import CartLayout from './Layout.tsx/CartLayout';
import RowLayout from './Layout.tsx/RowLayout';
import CarouselLayout from './Layout.tsx/CarouselLayout';


const ProductContainer = (props: any) => {
    const { type } = props;

    if (type === "column") {
        return <ColumnLayout {...props} />
    }

    if (type === "cart"){
        return <CartLayout {...props} />
    }

    if (type === "order"){
        return <CartLayout {...props} />
    }

    if (type === "carousel"){
        return <CarouselLayout {...props} />
    }
    
    return <RowLayout {...props} />
}

export default ProductContainer;

