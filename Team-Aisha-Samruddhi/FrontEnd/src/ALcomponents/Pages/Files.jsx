import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../../components/App';
import FilesList from '../../components/FilesList';
import HeaderF from '../../components/Header';
import Navbar from '../../Admin2/Navbar';

const Files = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container" style={{backgroundColor:'white'}}>
      <HeaderF/>
      <div className="main-content" >
        <Switch>
          <Route component={App} path="/LHome" exact={true} />
          <Route component={FilesList} path="/list" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default Files
