import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logout } from "../../../actions/Account/UserActions";
import logo from "../../../images/logo/ACS.png";
import Sidebar from "./Sidebar";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
const drawerWidth = 220;
/*** Material UI Styles ***/
const useStyles = makeStyles(theme => ({

    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        height: "2.6em",
        marginLeft: "0.2rem",
        // marginRight: "0.5rem",
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12
    },

}));

export default function App() {
    /*** Material UI Styles ***/
    const theme = useTheme();
    const classes = useStyles();

    /*** Redux States ***/
    const userLogin = useSelector(state => state.Profile["userLogin"])
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    /** Logout **/
    const history = useHistory();
    const logoutHandler = () => {
        dispatch(logout());
        history.push("/Login");
    }

    /*** Local States ***/
    /* Check drawer position (depending on screen size) */
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    /* Drawer controls */
    const [sidebarState, setSidebarState] = useState(false);

    const toggleSidebar = event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setSidebarState(!sidebarState);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleSidebar}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img alt="App Logo" src={logo} className={classes.logo} />
                    <Typography variant="h6" hidden={isMdUp ? false : true} noWrap>
                        ИГХ: ALK
                    </Typography>
                    <section className={classes.rightToolbar} >
                        {userInfo
                            ?
                            <div hidden={isSmUp ? false : true}>
                                <Button color="inherit" >{userInfo["first_name"]} {userInfo["last_name"]} </Button>
                                <Button onClick={logoutHandler} color="inherit" endIcon={<PowerSettingsNewIcon/>}>Выйти</Button>
                                <Button color="inherit" ><strong>RU</strong></Button>
                            </div>
                            : null}
                    </section>
                </Toolbar>

            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={isMdUp ? "permanent" : "temporary"}
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
                open={sidebarState}
                onClose={toggleSidebar}>
                <div className={classes.toolbar} />

                <Sidebar />
            </Drawer>
        </React.Fragment>
    );
}