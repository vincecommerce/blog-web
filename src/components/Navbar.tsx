import { AccountCircleOutlined } from "@mui/icons-material"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import PostAddIcon from "@mui/icons-material/PostAdd"
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { getAuth } from "firebase/auth"
import { FC, Fragment, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import app from "../config"
import useBlog from "../context"
import { getUserAvatar } from "../utils"
import { NavbarProps } from "./types"

export const Navbar: FC = (props: NavbarProps) => {
  const { logout, isAuthenticated } = useBlog()
  const drawerWidth = 240
  const { window } = props
  const auth = getAuth(app)
  const navigate = useNavigate()
  const navItems: string[] = [
    "art",
    "science",
    "technology",
    "cinema",
    "design",
    "food",
  ]

  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    if (logout) logout()
    navigate("/")
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bulb Blog
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(`/?cat=${item}`)}>
            <ListItemButton
              sx={{ textAlign: "center", textTransform: "capitalize" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" sx={{ backgroundColor: "#050a30", p: "1rem" }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "space-between", sm: "none" },
            }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Box
              component="div"
              sx={{
                flexGrow: { xs: 0, sm: 1 },
                display: { xs: "none", sm: "block" },
              }}>
              <img src="/logo512.png" alt="no logo" width={32} height={32} />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item, index) => (
                <Link
                  to={`/?cat=${item}`}
                  key={index}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "1rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}>
                  {item}
                </Link>
              ))}
            </Box>
            {isAuthenticated ? (
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                <Avatar
                  sx={{ bgcolor: "#233cf6", ml: "0.5rem" }}
                  alt="Frank"
                  src={getUserAvatar(auth)}
                />
              </IconButton>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginRight: "1rem",
                  marginTop: "0.3rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}>
                <LoginIcon sx={{ color: "white", textAlign: "center" }} />
              </Link>
            )}
          </Container>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircleOutlined fontSize="medium" />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem onClick={() => navigate("/posts/add")}>
          <ListItemIcon>
            <PostAddIcon fontSize="medium" />
          </ListItemIcon>
          Write a post
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}
