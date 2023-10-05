import React, { useContext } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Box, Toolbar, styled } from '@mui/material'
import { AccountContext } from '../context/AccountProvider'
import ChatDialog from './chat/ChatDialog'

const Component = styled(Box)`
    height: 100vh;
    background:#DCDCDC;
`
const Header = styled(AppBar)`
    background-color: #00bfa5;
    height: 125px;
    box-shadow: none;
    
`
const LoginHeader = styled(AppBar)`
    background: #00bfa5;
    height: 200px;
    box-shadow: none;
`;
const Messenger = () => {
    const { account } = useContext(AccountContext)
    console.log('account--', account)
    return (
        <Component>
            {
                account ?
                    <>
                        <Header>
                            <Toolbar></Toolbar>
                        </Header>
                        <ChatDialog />
                    </>
                    :
                    <>
                        <LoginHeader>
                            <Toolbar>
                            </Toolbar>
                                <LoginDialog />

                        </LoginHeader>
                    </>
            }

        </Component>
    )
}

export default Messenger