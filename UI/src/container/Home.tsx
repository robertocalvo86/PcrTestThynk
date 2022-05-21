import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem
}
    from 'reactstrap';

// You can see all icons here: https://icons.getbootstrap.com/
import * as Icon from 'react-bootstrap-icons';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, orange, amber, lime, lightGreen } from '@material-ui/core/colors';


import { Redirect, Route, Switch, Link } from 'react-router-dom';

import { _logout } from '../service/IdentityUsers';

import routes from '../routes';

import { UserIdentity } from '../interfaces';

const Home = ({ history }) => {

    const __dispatch = useDispatch();

    const loading = useSelector(state => state.loading);

    const [collapsedNavBar, setCollapsedNavBar] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [usrIden, setUsrIden] = useState<UserIdentity | null>(null);

    const [menuItemSelected, setMenuItemSelected] = useState(0);

    const toggleNavbar = () => setCollapsedNavBar(!collapsedNavBar);

    const useStyles = makeStyles(theme => ({
        deepOrange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        green: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
        },
        orange: {
            color: theme.palette.getContrastText(orange[500]),
            backgroundColor: orange[500],
        },
        amber: {
            color: theme.palette.getContrastText(amber[500]),
            backgroundColor: amber[500],
        },
        lime: {
            color: theme.palette.getContrastText(lime[500]),
            backgroundColor: lime[500],
        },
        lightGreen: {
            color: theme.palette.getContrastText(lightGreen[500]),
            backgroundColor: lightGreen[500],
        },
    }));
    const classes = useStyles();

    const getColor = () => {
        if (!usrIden)
            return classes.lime;

        switch (usrIden.color) {
            case 1:
                return classes.deepOrange;
            case 2:
                return classes.green;
            case 3:
                return classes.orange;
            case 4:
                return classes.amber;
            case 5:
                return classes.lime;
            case 6:
                return classes.lightGreen;
            case 7:
                return classes.deepOrange;
            case 8:
                return classes.green;
            case 9:
                return classes.orange;
            case 10:
                return classes.amber;
            default:
                return classes.lime;
        }
    }

    useEffect(() => {
        let usrIdenObject = null;
        let usrIden = sessionStorage.getItem('user');
        if (usrIden)
            usrIdenObject = JSON.parse(usrIden);


        if (!usrIdenObject)
            setRedirectToLogin(true);

        setUsrIden(usrIdenObject);

        switch (history.location.pathname) {
            case "/documenti":
                onSelectMenuItem(2)
                break;
            case "/bookings":
                onSelectMenuItem(0)
                break;
            case "/newBooking":
                onSelectMenuItem(1)
                break;
            case "/dipendenti":
                onSelectMenuItem(3)
                break;
            case "/caricamentoBustePaga":
                onSelectMenuItem(4)
                break;
            default:
                onSelectMenuItem(0)
                break;
        }
        //eslint-disable-next-line
    }, []);

    const onLogOut = async () => {
        let result = await _logout(__dispatch);
        if (result) {
            setRedirectToLogin(true);
        }
    }

    const onSelectMenuItem = (index: number) => {
        setMenuItemSelected(index);
    }

    const onSelectMenuItemMobile = (index: number) => {
        toggleNavbar();
        onSelectMenuItem(index);
    }

    const _loading = (
        <div className="spinner"></div>
    )

    if (redirectToLogin) {
        return (<Redirect to="/login" />);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EBEDEF" }}>
            {loading && <div className="spinner"></div>}

            <div style={{ backgroundColor: "#5c6670", height: "30px", width: "100%", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", position: "fixed", top: "0px", zIndex: 3 }}></div>

            <Navbar light expand="md" style={{ zIndex: 3, backgroundColor: "white", position: "fixed", top: "30px", width: "100%", borderBottom: "1px solid #EBEDEF" }}>
                <NavbarBrand style={{ fontFamily: "Georgia", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px" }}>
                    <span style={{ fontSize: "23px" }}>Pcr Test Bookings</span>
                </NavbarBrand>
                <Fragment>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={collapsedNavBar} navbar>
                        <Nav className="ml-auto" navbar>
                            <div id="mobileNav">
                                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                                    <NavItem>
                                        <div className="leftMenuItem" id="" ><Link onClick={() => onSelectMenuItemMobile(0)} style={{ textDecoration: "none", color: "white" }} to="/bookings">
                                            <div style={{ position: "absolute" }}>
                                                {menuItemSelected !== 0 && <Icon.EaselFill />}
                                                {menuItemSelected === 0 && <Icon.EaselFill color="#38baed" />}
                                            </div> <div style={{ marginLeft: "40px" }}><span>Bookings</span></div>
                                        </Link></div>
                                    </NavItem>
                                    <NavItem>
                                        <div className="leftMenuItem" id="" ><Link onClick={() => onSelectMenuItemMobile(1)} style={{ textDecoration: "none", color: "white" }} to="/newBooking">
                                            <div style={{ position: "absolute" }}>
                                                {menuItemSelected !== 1 && <Icon.InboxFill />}
                                                {menuItemSelected === 1 && <Icon.InboxFill color="#38baed" />}
                                            </div> <div style={{ marginLeft: "40px" }}><span>New Booking</span></div>
                                        </Link></div>
                                    </NavItem>
                                </div>
                            </div>
                            <NavItem style={{ marginRight: "5px" }}>
                                <Button className="customButtonDisconnetti" style={{ verticalAlign: "bottom", float: "right" }} onClick={onLogOut} > <Icon.BoxArrowLeft style={{ verticalAlign: "-2px" }} />{' '}Sign Out</Button>
                                {usrIden && <Fragment>
                                    <Avatar className={getColor()} style={{ width: "33px", height: "33px", float: "right", marginRight: "10px", marginTop: "2px" }}>{usrIden.userName.substr(0, 1).toUpperCase()}</Avatar>
                                    <span style={{ color: "white", marginRight: "10px", marginTop: "6px", float: "right" }}>{usrIden.userName}</span>
                                </Fragment>}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Fragment>
            </Navbar>

            <div style={{ position: "relative", marginTop: "100px" }}>
                <div id="leftMenu" style={{ width: "200px", backgroundColor: "#5c6670", position: "fixed", top: "100px", left: "0px", paddingTop: "10px", height: "100%" }}>

                    <div className="leftMenuItem" id="" ><Link style={{ textDecoration: "none", color: "white" }} to="/bookings" onClick={() => onSelectMenuItem(0)}>
                        <div style={{ position: "absolute", top: "14px", left: "10px" }}>
                            {menuItemSelected !== 0 && <Icon.EaselFill />}
                            {menuItemSelected === 0 && <Icon.EaselFill color="#38baed" />}
                        </div> <div style={{ marginLeft: "40px" }}><span>Bookings</span></div>
                        <div style={{ backgroundColor: "#8c8c8c", width: "175px", height: "1px", position: "absolute", top: "53px", left: "10px" }}></div>
                    </Link></div>

                    <div className="leftMenuItem" id="" ><Link style={{ textDecoration: "none", color: "white" }} to="/newBooking" onClick={() => onSelectMenuItem(1)}>
                        <div style={{ position: "absolute", top: "14px", left: "10px" }}>
                            {menuItemSelected !== 1 && <Icon.InboxFill />}
                            {menuItemSelected === 1 && <Icon.InboxFill color="#38baed" />}
                        </div> <div style={{ marginLeft: "40px" }}><span>New Booking</span></div>
                        <div style={{ backgroundColor: "#8c8c8c", width: "175px", height: "1px", position: "absolute", top: "53px", left: "10px" }}></div>
                    </Link></div>
                </div>

                <main id="main" style={{ marginLeft: "200px" }} >
                    {/*<AppBreadcrumb id="" appRoutes={routesTranslated} router={router} />*/}
                    <Container fluid style={{ backgroundColor: "#fbfcfc", minHeight: "83vh", paddingBottom: "100px" }}>
                    <div style={{ padding: "30px 15px 15px 20px" }}>
                        <React.Suspense fallback={_loading}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />
                                    ) : (null);
                                })}
                            </Switch>
                        </React.Suspense>
                    </div>
                    </Container>
                </main>
            </div>
        </div>
    );
}

export default Home;