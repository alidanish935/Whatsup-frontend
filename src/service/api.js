import axios from 'axios'

const url = 'http://localhost:8000'

export const addUser = async (data)=>{
    try{
        const res = await axios.post(`${url}/add`,data)
        console.log('res in addUser api.js',res.data)
        return res.data
    }catch(error){
        console.log('error while calling addUser api',error.message)
        return error.message
    }
}

export const getUser = async()=>{
    try{
        const res = await axios.get(`${url}/users`)
        return res.data
    }catch(error){
        console.log('error while getting user',error.message)
        return error.message
    }
}
export const setConversation= async(data)=>{
    try{
        const res = await axios.post(`${url}/conversation/add`,data)

    }catch(error){
        console.log('error while calling setConversation api',error.message)
        return error.message
    }
}

export const getConversation =async(data)=>{
    try{
        const res = await axios.post(`${url}/getconversation`,data)
        return res.data
    }catch(error){
        console.log('error while getting ',error.message)
        return error.message
    }
}

export const newMessage = async(data)=>{
    try{
        const res = await axios.post(`${url}/message/add`,data)
        return res.data
    }catch(error){
        console.log('error while sending newmsg ',error.message)
        return error.message
    }
}

export const getMessage = async(id)=>{
    try{
        const res = await axios.get(`${url}/message/get/${id}`)
        return res.data
    }catch(error){
        console.log('error while getting newmsg ',error.message)
        return error.message
    }
}

export const UploadFile = async(data)=>{
    try{
        const res = await axios.post(`${url}/file/upload`,data)
        return res
    }catch(error){
        console.log('error while adding file ',error.message)
        return error.message
    }
}