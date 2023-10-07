import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface State{
    value:string[]
}
const initialState:State = {
  value:[]
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload) ;
    },
    remove: (state, action: PayloadAction<string>) => {
      const arr=state.value.filter((obj)=>(
            obj!=action.payload
      ))
      state.value=arr ;
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = categorySlice.actions

export default categorySlice.reducer