
import {createStore} from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
   key: 'pawrfect',
   storage
}


const persistedReducer = persistReducer(persistConfig, reducer)

// export default () => {
//     let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//     let persistor = persistStore(store)
//     return {store, persistor}
// }

export const store  = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);