import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from './components/Menu/Header/AppBar';
import CaseUpdateForm from './components/Cases/Forms/UpdateForm';

import theme from "./components/Theme/Theme";
import ErrorScreen from './screens/Account/ErrorScreen';
import LoginScreen from './screens/Account/LoginScreen';
import Reg from './screens/Account/Reg';
import Dashboard from './screens/Dashboard.js';
import CaseBoard from './screens/Cases/CaseBoard';
import CaseArchive from './screens/Cases/CaseArchive';
import CaseReview from './screens/Cases/CaseReview';

const SERVER_URL = process.env.REACT_APP_API_SERVER;

/*** Material UI Styles Override ***/
const useStyles = makeStyles(theme => ({
  app: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

function AppProtectedRoute({ application: App, component: Component, ...rest }) {

  const userLogin = useSelector(state => state.Profile["userLogin"])
  const { loading, error, userInfo } = userLogin

  return (
    <Route {...rest} render={
      (props) => {
        if (userInfo != null) {

          switch (App) {
            case "ST1010":
              if (userInfo["application_rights"]["ST1010"] === true) {
                return <Component {...props} />

              } else {
                return <Redirect to="/Error" />
              }
            
            default:
              return <Component {...props} />
          }
        } else {
          return <Redirect to="/Login" />
        }
      }
    } />
  )
}

function App() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          
          <Route path='/Register' component={Reg} />
          <Route path="/Login" component={LoginScreen} />
          <Route path="/Error" component={ErrorScreen} />
          {/* URL Error screen for invalid URL  */}
          
          <React.Fragment>
            <div className={classes.app}>
              <Header />
              <main className={classes.content}>
                <Toolbar />
                <AppProtectedRoute exact path="/" component={Dashboard} />
                <AppProtectedRoute exact path="/ST1010" application="ST1010" component={CaseBoard} />
                <AppProtectedRoute exact path="/ST1010/Case/:id" application="ST1010" component={CaseUpdateForm} />
                <AppProtectedRoute exact path="/ST1010/Case/Review/:id" application="ST1010" component={CaseReview} />
                <AppProtectedRoute exact path="/ST1010/Case/:code/:number/Archive" application="ST1010" component={CaseArchive} />
                
              </main>
            </div>
          </React.Fragment>
          <Route render={() => <Redirect to={{pathname: "/Error"}} />} /> 
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;