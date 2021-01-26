import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import { Button } from 'rsuite';
import CommonStyles from '../../CustomStyles';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';

interface AppProps {
    id: string;
}

const ColumnLayoutButtons = (props: AppProps) => {
    const commonStyles = CommonStyles();
    const { id } = props;
    const [cartText, setCartText] = useState<boolean>(false);
    const store = useStore();
    const {addToCart, itemsToCart, removeItemFromCart} = store.cartStore;
    

    const handleAddToCart = () => {
        setCartText(true);
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        setCartText(false);
        removeItemFromCart(id);
    };


    useEffect(() => {
        const existingCartItem = itemsToCart.find(
            cartItemToAdd => cartItemToAdd.value === id
        );

        if (existingCartItem){
            setCartText(true)
        }


    }, [itemsToCart, id, setCartText]);

    return (
        <Grid item>
            {cartText === true ?
                <Button onClick={handleRemoveFromCart} className={commonStyles.cartBtnClicked} style={{ backgroundColor: "#15141b", color: "#fff"}}>Remove from cart</Button>
                :
                <Button onClick={handleAddToCart} className={commonStyles.cartBtn} style={{ backgroundColor: "transparent", color: "#15141b", }}>Add to cart</Button>
            }
        </Grid>
    )
}


export default observer(ColumnLayoutButtons);
