import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import '@progress/kendo-theme-default/dist/all.css';
//import 'suneditor/dist/css/suneditor.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//import Alert from "./popUps/Alert.js";

const Home = React.lazy(() => import('./container/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const BackOffice = React.lazy(() => import('./pages/Backoffice'));

const Alert = React.lazy(() => import('./popUps/Alert'));

const App = () => {

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Alert />
        <Switch>
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/backoffice" render={props => <BackOffice {...props} />} />
          <Route path="/" render={props => <Home {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
