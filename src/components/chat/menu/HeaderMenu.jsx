import {MoreVert} from '@mui/icons-material'
import { Menu, MenuItem, styled } from '@mui/material'
import { useState } from 'react';

const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;

const HeaderMenu = ({setOpenDrawer}) => {
    const [open, setOpen] = useState(null);

    const handleClose=()=>{
        setOpen(null)
    }

    const handleClick =(event)=>{
        setOpen(event.currentTarget)
    }
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

  return (
    <>
       <MoreVert onClick={handleClick} /> 
       <Menu 
       anchorEl={open}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'center'
        }}
        transformOrigin={{
            vertical:'top',
            horizontal:'right'
        }}
       >
            <MenuOption onClick={()=>{toggleDrawer(); handleClose()}} >Profile</MenuOption>
       </Menu>
    </>
  )
}

export default HeaderMenu