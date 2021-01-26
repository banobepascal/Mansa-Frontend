import React, {useState, useEffect} from 'react';
import { observer } from 'mobx-react';
import Category from './Category/Category';
import {BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    name: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}
interface AppProps {
    window?(): any;
    openSignin(value: string): void;
}

const TargetCategory = (props: MatchProps) => {
    const {match} = props;

    return (
       <div>
            <Route path='category/type/:id' component={Category} />
        </div>
    )
}


export default observer(TargetCategory);
