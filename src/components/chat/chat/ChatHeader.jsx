import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { defaultProfilePicture } from '../../../constants/data';
import { MoreVert, Search } from '@mui/icons-material';
import { AccountContext } from '../../../context/AccountProvider';

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
const Image = styled('img')({
    width:40,
    height:40,
    borderRadius:'50%'
})
const Name = styled(Typography)`
    margin-left: 12px !important;
`;
const RightContainer = styled(Box)`
    margin-left:auto;
    & > svg {
        padding:8px;
        font-size:22px;
        color:#000;
    }
`
const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;
const ChatHeader = ({person}) => {
  const { activeUsers } = useContext(AccountContext);
  console.log('active users---',activeUsers)
    const url = person.picture || defaultProfilePicture;

  return (
    <Header>
        <Image src={url} alt='dp' />
        <Box>
            <Name>{person.name} </Name>
            <Status>{activeUsers?.find(user => user.sub === person.sub)?'Online': 'Offline'}</Status>
        </Box>
        <RightContainer>
            <Search />
            <MoreVert />
        </RightContainer>
    </Header>
  )
}

export default ChatHeader