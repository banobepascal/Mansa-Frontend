import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import HelpAndSetting from './Components/HelpAndSetting';
import MainCategories from './Components/MainCategories';
import ListChild from './Components/ListChild';
import DrawerTopBar from '../DrawerTopBar';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';


interface AppProps {
    handleClose(): void;
    openSignin(value: string): void;
    categories: any[]
    user: any
}

const AppMenu = (props: AppProps) => {
    const { handleClose, openSignin, categories} = props;
    const [nest, setNest] = useState<string>("none");
    const category = useStore();
    const {showCategoryProductsInMenu, resetCategoryMenuProducts} = category.categoriesStore;

    const showNest = (id: string) => {
        setNest("nest");
        showCategoryProductsInMenu(id)
    }

    const showMain = () => {
        setNest("none");
        resetCategoryMenuProducts();
    }

    return  (
        <div>
            <div>
                <DrawerTopBar handleClose={handleClose} openSignin={openSignin}/>
            </div>

            <div style={{display: nest === "none" ? "block" : "none" }}>
                <MainCategories categories={categories} showNest={showNest} />
            </div>

            <div style={{display: nest === "none" ? "block" : "none" }}>
                <HelpAndSetting openSignin={openSignin} />
            </div>

            <div style={{display: nest === "nest" ? "block" : "none" }}>
                <ListChild showMain={showMain} />
            </div>        
        </div>
    );
}


export default observer(AppMenu);
