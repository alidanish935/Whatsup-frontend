import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import { Box, styled } from '@mui/material'
import Message from './Message';
import { AccountContext } from '../../../context/AccountProvider';
import { getMessage, newMessage } from '../../../service/api';
import { useRef } from 'react';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;
const Component = styled(Box)`
    height:80vh;
    overflow-y:scroll;
`
const Container = styled(Box)`
    padding: 1px 30px;
`;

const Messages = ({ person, conversation }) => {
    const { account, newMessageFlag, setNewMessageFlag ,socket} = useContext(AccountContext)
    const [value, setValue] = useState();
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState()
    const [imageUrl, setImageUrl] = useState('')
    const [incomingMessage,setIncomingMessage]=useState(null)

    const ScrollRef = useRef();

    useEffect(()=>{
        socket.current.on('getMessage',data =>{
            setIncomingMessage({
                ...data,
                createdAt:Date.now()
            })
        })
    },[])

    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if (!value) return
        // console.log('code',code)
        if (code === 13) {
            let message={}
            if (!file) {

                message = {
                    senderId: account.sub,
                    recieverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                }
            }else{
                message = {
                    senderId: account.sub,
                    recieverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: imageUrl
                }
            }

            socket.current.emit('sendMessage',message)
            await newMessage(message)
            setValue('')
            setFile('')
            setImageUrl('')
            setNewMessageFlag(prev => !prev)
            // console.log('message- ',message)
            // console.log('dbmsg- ',dbmsg)
        }
    }
    // help to scroll down to latest messageqqqqqqqqqqqqqqqqqqqqqqqqqq2awqEwwwwwWWWWWWWWWWWWWWW
    useEffect(()=>{
        ScrollRef.current?.scrollIntoView({transition:"smooth"})
    })
    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId)&&
            setMessages(prev => [...prev,incomingMessage])
    },[incomingMessage, conversation])
    useEffect(() => {
        // console.log('getMessageDetail---')
        const getMessageDetail = async () => {
            const res = await getMessage(conversation?._id);
            setMessages(res)
            // console.log('res in getMessageDetail - ',res)
        }
        getMessageDetail();
    }, [conversation?._id, person._id, newMessageFlag])
    return (
        <Wrapper>
            <Component>
                {
                    messages.length > 0 && messages.map(message => (
                        <Container ref={ScrollRef} >

                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>

        <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImageUrl={setImageUrl} />
        </Wrapper>

    )
}

export default Messages