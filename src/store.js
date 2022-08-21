import { configureStore, createSlice } from '@reduxjs/toolkit'

const show = createSlice({
    name:'show',
    initialState:[false],
    reducers:{
        setShow(state){
            state = [...state, false];
            return state;
        }
    }
})

export let {setShow} = show.actions;

export default configureStore({
    reducer:{
        show:show.reducer,
    }
})