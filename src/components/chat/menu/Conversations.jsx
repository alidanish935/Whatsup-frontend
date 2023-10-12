import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../../service/api'
import {Box, Divider, styled} from '@mui/material'
import Conversation from './Conversation';
import { AccountContext } from '../../../context/AccountProvider';


const Component = styled(Box)`
  overflow:overlay;
  height: 81vh;
`
const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: .6;
`

const Conversations = ({text}) => {
  const [users, setUsers] = useState([]);
  // const [activeUsers, setActiveUsers] = useState([]);
  const { account,socket,setActiveUsers } = useContext(AccountContext);

  useEffect(()=>{
    const fetchData= async()=>{
      const data =  await getUser()
      console.log('user data in conversations-',data)
      let filterData = data && data.filter(user =>user.name.toLowerCase().includes(text.toLowerCase()))
      setUsers(filterData)
     // setUsers(data)
    }
    fetchData()
  },[text])
  useEffect(()=>{
    socket.current.emit('addUser',account)
    socket.current.on("getUsers",users=>{
      console.log('users in socket--',users)
      setActiveUsers(users)
    })
  },[account])
  return (
   <Component>
    {
      users && users.map((user)=>(
        user.sub !== account.sub &&
        <>
        <Conversation user={user} />
        <StyledDivider />
        </>
        
      ))
    }
   </Component>
  )
}

export default Conversations