/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import { 
        Button,
        Box,
        Stack,
        Flex,
        Text,
        Divider
        } from '@chakra-ui/react'
import Navbar from './Navbar'
import type { RootState } from '../store/store'
import { useNavigate,createSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Obj} from '../store/expenseSlice'
const Expense = () => {
    const navigate=useNavigate() ;
    const expenseArray = useSelector((state: RootState) => state.Expense.value)
    const [dateArray,setDateArray]=useState<number[][]>([]) ;
    
    const handleEdit=(obj:Obj)=>{
      navigate({
        pathname:'/expense/edit',
        search:createSearchParams({
            object:JSON.stringify({
              amount:obj.amount,
              date:obj.date,
              category:obj.category,
              description:obj.description,
            })
        }).toString()
      })
    }

    useEffect(()=>{
        const arr=expenseArray.map((obj)=>{
           const d=new Date(obj.date) ;
            return [d.getFullYear(), d.getMonth() + Number(1), obj.amount]
        })
        arr.sort(( a, b ):number=>{ 
          if( a[0]!=b[0]) return b[0]-a[0];
          else return b[1]-a[1]
        })
        const uniqueArr=[] ;
        let i=0 ;
        while(i<arr.length){
              let j=i+1;
              uniqueArr.push(arr[i]) ;
              let monthAmt=Number(arr[i][2]) ;
              while(j<arr.length && arr[i][0]==arr[j][0] && arr[i][1]==arr[j][1]){
                   monthAmt+=Number(arr[j][2]) ;
                  ++j ;
              }
              if(i<uniqueArr.length)uniqueArr[i][2]=Number(monthAmt)  ;
              
              i=j ;
        }
        setDateArray(uniqueArr)
    },[])
  return (
    <Box height='100vh' >
      <Navbar heading='Expense Tracking'/>
      <Button colorScheme= 'blue' borderRadius={0} pos='absolute' top='10px' right='20px' onClick={()=>navigate('/expense/add')}>Add</Button>
      
      <Stack align='center' spacing='20px' marginTop='50px'>
          {
              dateArray.map((date,idx)=>{

              if(date!=undefined)
              return (
                  <Box key={idx} width='50vw'>
                    <Flex align='center' justify='space-between'>
                      <Text fontSize='20px' color='blue' fontWeight='bold'>{date[1]} / {date[0]}</Text>
                      <Text fontSize='27px' color={date[2]>=0 ?  'lightgreen' : 'blue'} fontWeight='bold'>$ {date[2]}</Text>
                    </Flex>
                    <Divider borderWidth='2px' borderColor='blue'/>
                    <Stack align='center' spacing='10px' marginTop='20px' >
                      {
                          expenseArray.map((obj,idx)=>{
                              
                              const d=new Date(obj.date)
                              const month=d.getMonth() + Number(1);
                              const year=d.getFullYear() ;
                              if(year==date[0] && month==date[1])
                              return(
                                <Box key={idx} width='90%' onClick={()=>handleEdit(obj)}>
                                <Flex align='center' justify='space-between'>
                                <Text color={obj.amount>=0 ?  'lightgreen' : 'blue'} fontWeight='bold' fontSize='18px'>{obj.category}</Text>
                                <Text color={obj.amount>=0 ?  'lightgreen' : 'blue'} fontWeight='bold' fontSize='18px' >$ {obj.amount}</Text>
                                </Flex>
                                <Divider borderWidth='1px' borderColor='blue'/>
                                
                                </Box>
                              )
                            })
                      }
                    </Stack>
                  </Box>

              )})
          }
      </Stack>
      <Box pos='fixed' width='100%' bottom='0px'>
          <Button colorScheme= 'blue' borderRadius={0} width='50%' >Expense</Button>
          <Button colorScheme='gray' borderRadius={0} width='50%'  onClick={()=>navigate('/category')}>Category</Button>
      </Box>
    </Box>
  )
}

export default Expense