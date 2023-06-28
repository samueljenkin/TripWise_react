import * as React from 'react'
import { useState } from "react"
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import Logo from '../images/TripWise-Logo.png'
import './NavBar.css'

const pages = [
    { name: 'View Trips', path: '/view-trips'},
    { name: 'Create Trip', path: '/create-trip'},
    { name: 'Create Budget', path: '/create-budget'}
]

const NavBar = ({ loggedInUser }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const controls = loggedInUser ? [
    { name: 'Log out', path: 'log-out'}
  ] : [
    { name: 'Log in', path: 'login'},
    { name: 'Sign up', path: 'sign-up'}
  ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#280004' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">
            <img 
              className='logo-large'
              src={Logo} 
              style={{ 
                maxWidth: '48px', 
                height: '100%', 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1 
              }} 
              alt="logo" 
            />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Dosis',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '.5rem'
            }}
          >
            TripWise
          </Typography>
          
          <div className="logo">
            <a href="/">
              <img 
                className='logo-small'
                src={Logo} 
                style={{ 
                  maxWidth: '48px', 
                  maxHeight: '48px',
                  height: '100%', 
                  display: { xs: 'none', md: 'flex' }, 
                  mr: 1 
                }} 
                alt="logo" 
              />
            </a>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Dosis',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                justifyContent: 'center',
                marginRight: 0,
                marginLeft: '.5rem',
                alignItems: 'center'
              }}
            >
              TripWise
            </Typography>
          </div>
          

          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-end'
          }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                    key={page.name} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                >
                  <Typography 
                    textAlign="center" 
                    sx={{ 
                      fontFamily: 'Expletus Sans',
                      fontWeight: 700 
                      }}
                    >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              {controls.map((control) => (
                <MenuItem 
                    key={control.name} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={control.path}
                >
                  <Typography 
                    textAlign="center" 
                    sx={{ 
                      fontFamily: 'Expletus Sans',
                      fontWeight: 700 
                      }}
                    >
                    {control.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  fontFamily: 'Expletus Sans',
                  fontWeight: 700
                }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
            {controls.map((control) => (
              <Button
                key={control.name}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  fontFamily: 'Expletus Sans',
                  fontWeight: 700
                }}
                component={Link}
                to={control.path}
              >
                {control.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar