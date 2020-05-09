import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e)
    }
}

function loadFromLocalStorage(state) {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();


const middlewares = [thunk, logger];

const store = createStore(
    rootReducer, 
    persistedState,
    applyMiddleware(...middlewares)
);

store.subscribe(()=> saveToLocalStorage(store.getState()));

export default store;