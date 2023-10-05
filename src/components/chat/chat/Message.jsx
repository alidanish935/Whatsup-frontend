import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider';
import { formateDate ,downloadMedia} from '../../../utils/common-utils';
import { GetApp as GetAppIcon } from '@mui/icons-material';
import {iconPDF} from '../../../constants/data.js'

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Own = styled(Box)`
    background: #dcf8c6;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;


const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  // console.log('message-----mm-', message)
  return (
    <>
      {
        account.sub === message.senderId ?
          <Own>
            {
              message.type === 'file' ? <ImageMessage message={message} />:<TextMessage message={message} />
            }
           
          </Own> :
          <Wrapper>
             {
              message.type === 'file' ? <ImageMessage message={message} />:<TextMessage message={message} />
            }

          </Wrapper>
      }

    </>
  )
}

const TextMessage = ({message})=>{
  return(
    <>
     <Text> {message.text} </Text>
      <Time>{formateDate(message.createdAt)} </Time>
    </>
  )
}
const ImageMessage = ({message})=>{
  // console.log('message-----image-', message.text)

  return(
   <Box style={{position:'relative'}}>
      {
        message?.text?.includes('.pdf')?
        <Box style={{display:'flex'}} >
          <img src={iconPDF} alt={iconPDF} style={{ width: 80 }} />
          <Typography style={{fontSize:14}} >{message.text.split("/").pop()} </Typography>
        </Box>
        :
        <img src={message.text} alt={message.text} style={{width:300,height:'100%',objectFit:'cover'}} />
      }
     <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%',cursor:'pointer' }} 
                />
                {formateDate(message.createdAt)}
            </Time>
   </Box>

  )
}

export default Message

{/* <div style={{ position: 'relative' }}>
{
    message?.text?.includes('.pdf') ?
        <div style={{ display: 'flex' }}>
            <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
            <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
        </div>
    : 
        <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
}
<Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
    <GetAppIcon 
        // onClick={(e) => downloadMedia(e, message.text)} 
        fontSize='small' 
        style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
    />
    {formateDate(message.createdAt)}
</Time>
</div> */}