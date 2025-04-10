import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Header from '../components/common/header/header'
import FilesList from '../components/FilesList';
import './AppRouter.css'
import Nav from '../ALcomponents/Nav';
import HeaderF from '../components/Header';
// import Back from '../components/common/back/Back';


const AppRouter = () => (
  <BrowserRouter>
  <Header/>
  <Nav/>
    <div className="container">
      <HeaderF/>
      <div className="main-content">
        <Switch>
          <Route component={App} path="/LHome" exact={true} />
          <Route component={FilesList} path="/list" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;