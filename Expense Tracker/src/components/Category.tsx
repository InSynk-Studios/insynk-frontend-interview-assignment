import {useRef, useState} from 'react'
import Navbar from './Navbar'
import { CloseIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from '../store/categorySlice'
import { removeByCategory } from '../store/expenseSlice'
import {
        Box,
        Button,
        IconButton,
        Text,
        Divider,
        Stack,
        Flex,
        Input,
        UnorderedList,
        ListItem,
        AlertDialog,
        AlertDialogBody,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogContent,
        AlertDialogOverlay,
        useDisclosure,
       } from '@chakra-ui/react'


const Category = () => {
    const navigate=useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const categoryArray = useSelector((state: RootState) => state.Category.value)
    const [category,setCategory]=useState('')
    const [toBeDeleted,setToBeDeleted]=useState('')
    const cancelRef = useRef<HTMLButtonElement>(null)
    const dispatch = useDispatch()

    const handleAdd=()=>{
        dispatch(add(category))
        setCategory('')
    }
    const handleRemove=()=>{
        dispatch(removeByCategory(toBeDeleted)) ;
        dispatch(remove(toBeDeleted)) ;
        onClose() ;
    }
  return (
    <Box height='100vh'>
        <Navbar heading='Category List'/>
        <Stack align='center' spacing='20px' marginTop='50px'>
        {
            categoryArray.map((obj,idx)=>(
                <Box key={idx} width='50vw'>
                <Flex align='center' justify='space-between'>
                <Text fontWeight='bold' color='blue' fontSize='18px'>{obj}</Text>
                <IconButton
                    colorScheme='white'
                    aria-label='Close'
                    textDecoration='none !important'
                    boxShadow= 'none !important'
                    outline= 'none !important'
                    borderColor= 'none !important'
                    icon={<CloseIcon  color='red'/>}
                    onClick={()=>{onOpen() ; setToBeDeleted(obj)}}
                />
                </Flex>
                <Divider borderWidth='1px' borderColor='blue'/>
                </Box>
            ))
        }

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete "{toBeDeleted}" Category
            </AlertDialogHeader>

            <AlertDialogBody>
            <UnorderedList>
                <ListItem> {toBeDeleted} will be removed.</ListItem>
                <ListItem> All the Expense with this category will also be removed.</ListItem>
            </UnorderedList>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleRemove} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

        <Flex width='50vw'>
        <Input borderColor='blue' value={category} onChange={(e)=>{setCategory(e.target.value) }}/>
        <Button colorScheme='blue' borderRadius={0} onClick={handleAdd}>Add</Button>
        </Flex>
        </Stack>

        <Box pos='absolute' width='100vw' bottom='0px'>
            <Button colorScheme= 'gray' borderRadius={0} width='50%' onClick={()=>navigate('/')}>Expense</Button>
            <Button colorScheme='blue' borderRadius={0} width='50%'  >Category</Button>
        </Box>
    </Box>
  )
}

export default Category