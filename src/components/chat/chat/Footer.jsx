import { AttachFile, EmojiEmotions, Mic } from '@mui/icons-material';
import { Box, InputBase, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { UploadFile } from '../../../service/api';


const Container = styled(Box)`
    height:55px;
    background: #ededed;
    width:100%;
    display:flex;
    align-items:center;
    padding:0 15px;
    & > * {
        margin:5px;
        color:#919191
    }
`;
const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;
const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;
const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;
const Footer = ({sendText,setValue,value,file,setFile,setImageUrl}) => {
    const onFileChange=(e)=>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        setValue(e.target.files[0].name)
    }
    useEffect(()=>{
        const setImage = async() => {
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                const res = await UploadFile(data);
                console.log('res in footer image upload-- ',res)
                setImageUrl(res.data)
            }
        }
        setImage()
    },[file])
  return (
    <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
        <input type='file' id="fileInput" style={{display:'none'}} onChange={(e)=>onFileChange(e)} />
        <Search>
            <InputField onKeyPress={(e)=>sendText(e)}  placeholder="Type a message" onChange={(e)=>setValue(e.target.value)} value={value} />
        </Search>
        <Mic />
    </Container>
  )
}

export default Footer