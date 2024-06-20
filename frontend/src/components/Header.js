import React from 'react'
import { Box } from '@mui/material'
import headerImage from '../images/jobbg.jpg'

const Header = () => {
    return (
        <>
            <Box sx={
                {
                    padding: "10px",
                    bgcolor: "lightblue", 
                    minHeight: "400px", 
                    backgroundImage: `url(${headerImage})`, 
                    backgroundPosition: "center", 
                    backgroundSize: "cover"
                }
            }/>
        </>
    )
}

export default Header