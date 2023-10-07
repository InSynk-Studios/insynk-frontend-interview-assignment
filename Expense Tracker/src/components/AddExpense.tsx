import { useState } from 'react'
import {
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    Select,
    Input,
    InputRightElement,
    InputGroup,
    Textarea,
    Button,
    Stack,
  } from '@chakra-ui/react'
import Navbar from './Navbar'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../store/expenseSlice'
import {Obj} from '../store/expenseSlice'
import { useNavigate } from 'react-router-dom'
const AddExpense = () => {
  const categoryArray = useSelector((state: RootState) => state.Category.value)
  const navigate=useNavigate()
  const dispatch = useDispatch()
    const [date, setDate]=useState('') ;
    const [category,setCategory]=useState('') ;
    const [amt,setAmt]=useState(0) ;
    const [desc,setDesc]=useState('') ;
    const [cashState, setcashState]=useState(1) ;
    
    const handleAdd=()=>{
        if(date==''){
            alert('Please Enter Valid Date')
            return
        }
        if(category==''){
            alert('Please Enter Valid Category')
            return
        }
        if(amt==0){
            alert('Please Enter Valid Amount')
            return
        }

        let curAmt=amt ;
        if(cashState==0)curAmt=-Math.abs(amt) ;
        const obj:Obj={
          amount:curAmt,
          date:date,
          category:category,
          description:desc
        }
        dispatch(add(obj))
        navigate('/')
    }
  return (
    <>
        <Navbar heading='Add Expense' />
        <FormControl style={{width:'45vw',margin:'50px auto 0px'}}>
            <Stack>
                <FormLabel>Type</FormLabel>
                <div>
                <Button colorScheme={cashState ? 'blue':'gray'} borderRadius={0} width='50%' onClick={()=>setcashState(1)}>Cash in</Button>
                <Button colorScheme={cashState ? 'gray':'blue'} borderRadius={0} width='50%' onClick={()=>setcashState(0)}>Cash out</Button>
                </div>
                <FormLabel>Category</FormLabel>
                <Select placeholder='Select Category' onChange={(e)=>{setCategory(e.target.value)}} isRequired>
                    {
                        categoryArray.map((obj,idx)=>(
                            <option key={idx}>{obj}</option>
                        ))
                    }
                </Select>

                <FormLabel>Amount</FormLabel>
                <InputGroup onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAmt(Number(e.target.value))}}>
                    <NumberInput style={{width:'100%'}} isRequired>
                        <NumberInputField  />
                        <InputRightElement children='$'/>
                    </NumberInput>
                </InputGroup>

                <FormLabel>Date</FormLabel>
                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    onChange={(e)=>{setDate(e.target.value)}}
                    isRequired
                />

                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Add Description' onChange={(e)=>{setDesc(e.target.value)}}/>

            </Stack>
        </FormControl>
        <div style={{width:'45vw', margin:'50px auto',display:'flex', justifyContent:'space-between'}}>
            <Button colorScheme='blue' variant='outline' borderRadius={0} width='40%' onClick={()=>{navigate('/')}}>Cancel</Button>
            <Button colorScheme='blue' borderRadius={0} width='40%' onClick={handleAdd}>Add</Button>
        </div>
    </>
  )
}

export default AddExpense