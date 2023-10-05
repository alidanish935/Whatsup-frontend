import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { Box } from '@mui/material'
import { UserContext } from '../../../context/UserProvider'
import { AccountContext } from '../../../context/AccountProvider'
import { getConversation } from '../../../service/api'

const ChatBox = () => {
  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);

  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationFn = async () => {
      const data = await getConversation({ senderId: account.sub, recieverId: person.sub })
      console.log('getConversation data--', data)
      setConversation(data)
    }
    getConversationFn()
  }, [person.sub])
  return (
    <Box>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  )
}

export default ChatBox