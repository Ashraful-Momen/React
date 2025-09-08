import { configureStore } from '@reduxjs/toolkit';

import postSlice  from '../feature/postSlice'


export const store = configureStore({

    reducer: {
        postR : postSlice,
    }
}); 


