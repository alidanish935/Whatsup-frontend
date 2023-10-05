import React, { createContext, useState,useRef, useEffect } from 'react'
import {io} from 'socket.io-client'

export const AccountContext = createContext(null)

const AccountProvider = ({children}) => {
    const [ account, setAccount ] = useState();
    const [newMessageFlag, setNewMessageFlag] =useState()
    const [activeUsers, setActiveUsers] = useState([]);

    const socket = useRef();

    useEffect(()=>{
      socket.current = io('ws://localhost:9000')
    },[])

  return (
    <AccountContext.Provider value={{account, setAccount,newMessageFlag, setNewMessageFlag,socket,activeUsers, setActiveUsers}} >
        {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider