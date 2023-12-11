import React, {useEffect, useState} from "react";

import {Button, Typography, Tooltip, IconButton, Avatar, ListItemIcon, Divider, MenuItem, Menu} from "@mui/material";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import router from "next/router";
import AttributionOutlinedIcon from '@mui/icons-material/AttributionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import {User} from "../../models/user";
import {useAppDispatch, useAppSelector} from "../../api/config/config";
import {RootState} from "../../redux/reducers";
import {logout} from "../../redux/effects/auth/effects";

export default function Navbar() {
  const dispatch = useAppDispatch()
  const user: User | null = useAppSelector((state: RootState) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNewLoanClick = () => {
    router.push("/microcredit/loans/add");
  };
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    await dispatch(logout())

  };

  return (
    <>
      <div>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}

          <div className="flex flex-row items-center space-x-4">
            <a
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Microcredflow
            </a>
            <div style={{marginLeft: "4em"}}>

            </div>
            <div className="mx-4">
              <Button className="bg-blueGray-800 text-white text-sm font-bold uppercase px-4   py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 active:bg-blueGray-700 "
                      onClick={handleNewLoanClick}>Novo Empréstimo</Button>

            </div>
          </div>
          {/* Form */}
          {/* User */}
          <div className="flex flex-row space-x-4">

          <Typography className="flex-col md:flex-row list-none items-center   uppercase hidden md:flex text-white">
            {user?.fullName}
          </Typography>
          {/*  <ul className="flex-col md:flex-row list-none items-center hidden md:flex">*/}
          {/*  <UserDropdown />*/}
          {/*</ul>*/}

            <Tooltip title="Account settings">
              <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{user?.fullName.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
          </div>
          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AttributionOutlinedIcon fontSize="small"/>
              </ListItemIcon>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Terminar Sessão
            </MenuItem>
          </Menu>


        </div>
      </nav>
      {/* End Navbar */}
    </div>
      </>
  );
}
