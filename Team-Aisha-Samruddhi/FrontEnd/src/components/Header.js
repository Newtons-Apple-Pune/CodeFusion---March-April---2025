import React from 'react';
import { NavLink } from 'react-router-dom';
import './file.css'


const HeaderF = () => {
  return (
    <>
    <div className='fileab'>
      </div>
      <div className='filebc'>
      <div className="header">
      <h1>File Upload And Download</h1>
      <nav>
        <NavLink activeClassName="active" to="/LHome" exact={true}>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/list">
          Files List
        </NavLink>
        </nav>
        </div>
        </div>
        </>
  );
};

export default HeaderF;
