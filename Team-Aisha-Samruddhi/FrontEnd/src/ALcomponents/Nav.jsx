// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { BsMicrosoftTeams } from "react-icons/bs";
// import { FcCalendar, FcAbout, FcAdvertising } from "react-icons/fc";
// import { PiChats } from "react-icons/pi";
// import { GiFiles } from "react-icons/gi";
// import './AL.css';

// const Nav = () => {
//     const menuItem = [
//         {
//             path: "/Activity",
//             name: "ToDo",
//             icon: <FcAbout />
//         },
//         {
//             path: "/chat",
//             name: "Chats",
//             icon: <PiChats />
//         },
//         {
//             path: "/calls",
//             name: "Calls",
//             icon: <BsMicrosoftTeams />
//         },
//         {
//             path: "/files",
//             name: "Files",
//             icon: <GiFiles />
//         },
//         {
//             path: "/calendar",
//             name: "Calendar",
//             icon: <FcCalendar />
//         }
//     ];
//     const reloadPage = () => {
//         window.location.reload();
//     };

//     return (
//         <div className='abcontainer'>
//             <div className="absidebar">
//                 {menuItem.map((item, index) => (
//                     <div className="amargin" key={index}  onClick={reloadPage}>
//                         <NavLink to={item.path} className="ablink" activeClassName="active" >
//                             <div className="abicon">{item.icon}</div>
//                             <div className="ablink_text">{item.name}</div>
//                         </NavLink>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Nav;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsMicrosoftTeams } from "react-icons/bs";
import { FcCalendar, FcAbout, FcAdvertising } from "react-icons/fc";
import { PiChats } from "react-icons/pi";
import { GiFiles } from "react-icons/gi";
import './AL.css';

const Nav = () => {
    const menuItem = [
        {
            path: "/Activity",
            name: "ToDo",
            icon: <FcAbout />
        },
        {
            path: "/chat",
            name: "Chats",
            icon: <PiChats />
        },
        {
            path: "/calls",
            name: "Calls",
            icon: <BsMicrosoftTeams />
        },
        {
            path: "/files",
            name: "Files",
            icon: <GiFiles />
        },
        {
            path: "/calendar",
            name: "Calendar",
            icon: <FcCalendar />
        }
    ];
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className='abcontainer'>
            <div className="absidebar">
                {menuItem.map((item, index) => (
                    <div className="amargin" key={index}  onClick={reloadPage}>
                        <NavLink to={item.path} className="ablink" activeClassName="active" >
                            <div className="abicon btn btn-outline-dark btn btn-light">{item.icon}</div>
                            <div className="ablink_text">{item.name}</div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Nav;
