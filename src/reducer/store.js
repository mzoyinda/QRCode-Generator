import { configureStore } from '@reduxjs/toolkit';
import placeholderReducer from './slice/placeholder.slice'

export const store = configureStore({
    reducer: {
        placeholders: placeholderReducer
    }
});