import React, { useState } from 'react';
import './sidebar.css';
import { SidebardataB, SidebardataT } from '../../../data/datasbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarOption from './SidebarOption'
import LoginMain from '../../client/LoginMain';



const Assignment = () => <div>
  <LoginMain/>
</div>; // Placeholder for calls page

const SideBar = () => {
  // Define state to keep track of the active option
  const [activeOption, setActiveOption] = useState('Calls');

  const topOptions = SidebardataT;
  const bottomOptions = SidebardataB;

  // Function to handle option click
  const handleOptionClick = (optionName) => {
    setActiveOption(optionName);
  };

  return (
    <Router>
    <div className='Sbody'> 
      <div className='Stop'>
        <div>
          {topOptions.map((option) => (
            <SidebarOption
              key={option.name}
              option={option}
              isActive={option.name === activeOption}
              onClick={() => handleOptionClick(option.name)}
            />
          ))}
        </div>
      </div>
     
      <div className='SBottom'>
        {bottomOptions.map((option) => (
          <div key={option.name}>
            <SidebarOption
              option={option}
              isActive={option.name === activeOption}
              onClick={() => handleOptionClick(option.name)}
            />
            </div>
        ))}
      </div>
    </div>
    <Switch>
    {/* <Route path='/calls' component={Calls} /> */}
    <Route path='/Assignment' component={Assignment} />
    {/* Add more routes as needed */}
  </Switch>
</Router>
  );
}

export default SideBar;
