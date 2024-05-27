import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null,
}
export const productModalSlice = createSlice({
    name: 'productModal',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload
            console.log(state.value)
        },
        remove: (state) => {
            state.value = null
            console.log(state.value)
        }
    }
})
export const { set, remove } = productModalSlice.actions
export default productModalSlice.reducer