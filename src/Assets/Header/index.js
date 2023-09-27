import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CategoryIcon from "@mui/icons-material/Category";
import FormatOverlineIcon from "@mui/icons-material/FormatOverline";
import { GiStrongMan, GiStrong } from "react-icons/gi";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../../firebase";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";
import { useContext } from "react";
import { Context } from "../../Private";
import { CgGym } from "react-icons/cg";
import { lightBlue } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

function Header(props, theme) {
  const { userData } = useContext(Context);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [admin, setAdmin] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    verificRole();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const verificRole = async () => {
    await onAuthStateChanged(auth, (user) => {
      //se tem user logado
      if (user) {
        const userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            if (doc.data().isAdmin) {
              setAdmin(true);
            } else setAdmin(false);
          }
        });
      }
    });
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: lightBlue[500],
        }}
      >
        {userData ? (
          <>
            <CgGym size="2rem" />
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {userData.nome}
            </Typography>
            <CgGym size="2rem" />
          </>
        ) : (
          <></>
        )}
      </Toolbar>
      {admin && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/exercises");
                }}
              >
                <ListItemIcon>
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText primary={"Exercícios"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/categories");
                }}
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={"Categorias"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/metods");
                }}
              >
                <ListItemIcon>
                  <FormatOverlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Métodos"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/trainings");
                }}
              >
                <ListItemIcon>
                  <GiStrongMan />
                </ListItemIcon>
                <ListItemText primary={"Treinos"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/newTraining");
                }}
              >
                <ListItemIcon>
                  <GiStrongMan />
                </ListItemIcon>
                <ListItemText primary={"Novo treino"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  mobileOpen && handleDrawerToggle();
                  navigate("/users");
                }}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Usuários"} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              mobileOpen && handleDrawerToggle();
              navigate("/trainingToDay");
            }}
          >
            <ListItemIcon>
              <GiStrong />
            </ListItemIcon>
            <ListItemText primary={"Treino de hoje"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              mobileOpen && handleDrawerToggle();
              navigate("/confirmeds");
            }}
          >
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Confirmados"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          // display: { sm: "block", md: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: userData.tipo !== "personal" ? "block" :'none' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Correndo do Sofá
          </Typography>
          {userData.tipo === "personal" && (
        <ExitToAppIcon
          sx={{
            color: "white",
            cursor: "pointer",
            fontSize:30
          }}
          onClick={() => {
            logout();
          }}
        />
      )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          onClose={handleDrawerToggle}
          open={mobileOpen}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
