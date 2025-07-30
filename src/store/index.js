import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import todosReducer from './todosSlice';

const persistConfig = {
  key: 'todos',
  storage,
  whitelist: ['items', 'filter'] 
};

const persistedReducer = persistReducer(persistConfig, todosReducer);

export const store = configureStore({
  reducer: { todos: persistedReducer }
});

export const persistor = persistStore(store);