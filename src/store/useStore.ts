import { useContext } from 'react';
import { StoreContext } from './context';
import RootStore from './rootStore';

export const useStore = (): RootStore => useContext(StoreContext);
