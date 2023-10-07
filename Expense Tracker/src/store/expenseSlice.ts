import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Obj {
  amount:number
  date:string
  category:string
  description:string
}
interface State{
    value:Obj[]
}
const initialState:State = {
  value:[]
}

export const expenseSlice = createSlice({
  name: 'Expense',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Obj>) => {
      state.value.push(action.payload) ;
    },
    remove: (state, action: PayloadAction<Obj>) => {
        const arr=state.value.filter((obj)=>(
              JSON.stringify(obj)!=JSON.stringify(action.payload)
        ))
        state.value=arr ;
      },
    removeByCategory:(state, action: PayloadAction<string>)=>{
        const arr=state.value.filter((obj)=>(
            obj.category!=action.payload
      ))
      state.value=arr ;
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, removeByCategory } = expenseSlice.actions

export default expenseSlice.reducer