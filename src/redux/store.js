import { configureStore } from "@reduxjs/toolkit"
import ecommerceReducer from "../redux/ecommerceSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, ecommerceReducer)

export const store = configureStore({
    reducer: {ecommerce:persistedReducer },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
})

export let persistor = persistStore(store)