import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AirplayIcon from '@material-ui/icons/Airplay';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

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
    content: {

        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function Sidebar() {
    /*** Material UI Styles ***/
    const classes = useStyles();

    /*** Redux States ***/
    const userLogin = useSelector(state => state.Profile["userLogin"])
    const { userInfo } = userLogin

    /*** Local States ***/
    /* Check available services */
    if (userInfo) {
        var appPermissions = Object.keys(userInfo["application_rights"]).some(function (app) {
            return userInfo["application_rights"][app] === true;
        });
    }

    /* Sidebar content */
    const [services, setServices] = useState(false);

    const handleServices = () => {
        setServices(!services);
    };

    return (
        <div>
            <List>
                <ListItem component={Link} to="/" button>
                    <ListItemIcon>
                        <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Главная панель" />
                </ListItem>
                {/* Check services permissions */}
                {appPermissions ?
                    <ListItem button onClick={handleServices}>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Сервисы" />
                        {services ? <ExpandLess /> : <ExpandMore />}
                    </ListItem> :
                    <ListItem>
                        На вашем аккаунте нет привязаных приложений. Свяжитесь с пользователями высшей категории, или администрацией сайта для получения прав.
                    </ListItem>}
                <Collapse in={services} timeout="auto" unmountOnExit>
                    {userInfo ?
                        <React.Fragment>
                            <List component="div" disablePadding>

                                {userInfo["application_rights"]["ST1010"] === true &&
                                    <ListItem component={Link} to="/ST1010" button className={classes.nested}>
                                        <ListItemIcon>
                                            <AirplayIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="ИГХ: ALK" />
                                    </ListItem>}
                            </List>
                           
                        </React.Fragment> : null}
                </Collapse>
            </List>
            <Divider />
        </div>
    )
}

export default Sidebar;
