import React from 'react'
import Header from '../common/header/header'
import SideBar from '../common/sidebar/sidebar'
import LeftFold from '../common/left-fold/left-fold'
import RightFold from '../common/right-fold/right-fold'
import './call.css'
import Nav from '../../ALcomponents/Nav'

const Calls = () => {
    return (
        <div className='callsab'>
            <Header/>
            <div className='callsbc'>
                <div className='callscd'>
                    <SideBar /> 
                    <Nav/>      
                   </div>
                <div className='calls-leftfold'>
                    <LeftFold />
                </div>
                <div className='calls-righfold'>
                    <RightFold />
                </div>
            </div>
        </div>
        
    )
}

export default Calls