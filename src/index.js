import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {StoreProvider} from "./store/context";
import RootStore from "./store/rootStore";
import './assets/index.css';
import 'rsuite/dist/styles/rsuite-default.css';

const root = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={root}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

