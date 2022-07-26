import { Box } from '@mui/material'
import Head from 'next/head';
import React, { FC } from 'react'
import { NavBar, Sidebar } from '../ui';

interface Props{
    title?: string;
    children?: React.ReactNode
}

//prop sx es el style con acceso al theme. flexFlow es que se extienda lo mas posible
export const Layout:FC<Props> = ({title = 'OpenJira', children}) => {
  return (
   <Box sx={{flexFlow: 1}}>  
    <Head>
        <title>{title}</title>
    </Head>


    <NavBar></NavBar>
    <Sidebar></Sidebar>

    <Box sx={{padding: '10px 20px' }}>
        {children}
    </Box>
   </Box>
  )
}
