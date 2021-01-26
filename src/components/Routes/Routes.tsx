import React, { Component, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dash from '../Common/Dash/Dash';
import Homepage from '../Content/Homepage/Homepage';
import Product from '../Content/Product/Product';
import Categories from '../Content/Categories/Categories';
import Category from '../Content/Categories/Category/Category';
import Search from '../Content/Search/Search';
import Cart from '../Content/Cart/Cart';
import ShoppingList from '../Content/Lists/ShoppingList';
import Orders from '../Content/Orders/Orders';
import Settings from '../Content/Settings/Settings';
import Privacy from '../Content/Settings/Privacy';
import Sharing from '../Content/Settings/Sharing';
import Notifications from '../Content/Settings/Notifications';
import Addresses from '../Content/Settings/Addresses';
import Payment from '../Content/Settings/Payment';
import TargetShoppingList from '../Content/Lists/TargetShoppingList';
import WishList from '../Content/Lists/WishList';
import Favorites from '../Content/Lists/Favorites/Favorites';
import TargetWishList from '../Content/Lists/TargetWishList';
import { observer } from 'mobx-react';
import PasswordSettings from '../Content/Settings/PasswordSettings';
import StoreOwner from '../Content/StoreOwner/StoreOwner';
import Reseller from '../Content/Reseller/Reseller';


const Routes = () => {
    
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={() => <Dash Component={Homepage} />} />
                {/* <Route path="/product" component={() => <Dash Component={Product} />} /> */}
                <Route path="/product/:id" component={() => <Dash Component={Product} />} />
                <Route exact path="/category" component={() => <Dash Component={Categories} />} />
                <Route exact path="/search" component={() => <Dash Component={Search} />} />
                <Route exact path="/category/type/:id" component={() => <Dash Component={Category} />} />
                <Route path="/cart" component={() => <Dash  Component={Cart} />} />
                <Route path="/shoppinglist/" component={() => <Dash Component={ShoppingList} />} />
                <Route path="/wishlist/" component={() => <Dash Component={WishList} />} />
                <Route path="/shoppinglist/:id" component={() => <Dash Component={TargetShoppingList} />} />
                <Route path="/wishlist/:id" component={() => <Dash Component={TargetWishList} />} />
                <Route path="/favorites" component={() => <Dash Component={Favorites} />} />
                <Route path="/store-owner" component={() => <Dash Component={StoreOwner} />} />
                <Route path="/orders" component={() => <Dash Component={Orders} />} />
                <Route path="/settings" component={() => <Dash Component={Settings} />} />
                <Route path="/change-password" component={() => <Dash Component={PasswordSettings} />} />
                <Route path="/notifications" component={() => <Dash Component={Notifications} />} />
                <Route path="/address" component={() => <Dash Component={Addresses} />} />
                <Route path="/resell" component={() => <Dash Component={Reseller} />} />
            </Switch>
        </Router>
    )
}

export default observer(Routes);
