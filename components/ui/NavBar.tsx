import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext} from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const NavBar = () => {

  const {openSideMenu} = useContext(UIContext)

  return (
   <AppBar position='sticky' elevation={0}>
    <Toolbar>
        <IconButton 
          size='large' 
          edge='start' 
          onClick={openSideMenu}>
            <MenuOutlinedIcon></MenuOutlinedIcon>
        </IconButton>

        <Typography variant='h6'>OpenJira</Typography>
    </Toolbar>
   </AppBar>
  )
}
