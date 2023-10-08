import React, { useState } from 'react'
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
import { add, remove } from '../store/expenseSlice'
import {Obj} from '../store/expenseSlice'
import { useNavigate,useSearchParams } from 'react-router-dom'
const EditExpense = () => {
  const categoryArray = useSelector((state: RootState) => state.Category.value)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [searchparam]=useSearchParams() ;
    const paramObject=searchparam.get('object')
    const obj = paramObject ? JSON.parse(paramObject) : paramObject;
    const [date, setDate]=useState(obj.date) ;
    const [category,setCategory]=useState(obj.category) ;
    const [amt,setAmt]=useState(obj.amount) ;
    const [desc,setDesc]=useState(obj.description) ;
    const [cashState, setcashState]=useState(()=>{ if(obj.amount>=0) return 1 ; else return 0 }) ;
    const handleCash=()=>{
        setcashState(1-cashState) ;
    }
    const handleUpdate=()=>{
        if(cashState==0) setAmt(-amt);
        const tempObj:Obj={
          amount:amt,
          date:date,
          category:category,
          description:desc
        }
        dispatch(add(tempObj))
        handleRemove() ;
    }
    const handleRemove=()=>{
        dispatch(remove(obj))
        navigate('/')
    }
  return (
    <>
    <Navbar heading='Edit Expense' />
    <Button colorScheme= 'blue' borderRadius={0} pos='absolute' top='10px' right='20px' onClick={handleRemove}>Remove</Button>
     <FormControl style={{width:'45vw',margin:'50px auto 0px'}}>
        <Stack>
        <FormLabel>Type</FormLabel>
        <div>
        <Button colorScheme={cashState ? 'blue':'gray'} borderRadius={0} width='50%' onClick={handleCash}>Cash in</Button>
        <Button colorScheme={cashState ? 'gray':'blue'} borderRadius={0} width='50%' onClick={handleCash}>Cash out</Button>
        </div>
        <FormLabel>Category</FormLabel>
        <Select placeholder='Select Category' defaultValue={category} onChange={(e)=>{setCategory(e.target.value)}}>
            {
                categoryArray.map((obj)=>(
                    <option>{obj}</option>
                ))
            }
        </Select>

        <FormLabel>Amount</FormLabel>
        <InputGroup onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAmt(Number(e.target.value))}}>
        <NumberInput style={{width:'100%'}} defaultValue={amt}>
            <NumberInputField  />
            <InputRightElement children='$'/>
        </NumberInput>
        </InputGroup>

        <FormLabel>Date</FormLabel>
        <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            defaultValue={date}
            onChange={(e)=>{setDate(e.target.value)}}
        />

        <FormLabel>Description</FormLabel>
        <Textarea placeholder='Add Description' defaultValue={desc} onChange={(e)=>{setDesc(e.target.value)}}/>

        </Stack>
    </FormControl>
    <div style={{width:'45vw', margin:'50px auto',display:'flex', justifyContent:'space-between'}}>
        <Button colorScheme='blue' variant='outline' borderRadius={0} width='40%' onClick={()=>{navigate('/')}}>Cancel</Button>
        <Button colorScheme='blue' borderRadius={0} width='40%' onClick={handleUpdate}>Update</Button>
    </div>
    </>
  )
}

export default EditExpense