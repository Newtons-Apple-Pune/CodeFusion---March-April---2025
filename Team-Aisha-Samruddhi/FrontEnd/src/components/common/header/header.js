// import React from 'react'
// import './header.css'
// import { useHistory } from "react-router-dom";


// const Header = () => {
//   let history = useHistory();
//   const handleLogout=()=>{
//     localStorage.removeItem('token');
//     history.push('./login'); 
//     window.location.reload();
//   }
//   return (
//     <div>
//       <div className='Hbody'>
//         <div className='Hleftfold'>
//           <label className="Hlabel" style={{marginLeft:'100px',fontSize:'35px'}}>RAHBER</label>
//         </div>
//         {/* <div className='Hrightfold'>
//           <div className='HSearch'>
//           <i class="fa-brands fa-searchengin"></i>
//           <input placeholder='Search'></input>
//           </div>
//         </div> */}
//         <div className='Hprofile'>
//           <div className='Hoptions'>
//           {/* <i class="fa-solid fa-ellipsis">
//           </i> */}
//           <button class="btn btn-outline-danger" onClick={handleLogout}>logout</button>
//           {/* <a href='login' className='uinfo' onClick={handleLogout}>
//           <img className='Havatar'src='https://tse1.mm.bing.net/th?id=OIP.VixIl8SYp8qaYA-o_k_IJgHaHa&pid=Api&rs=1&c=1&qlt=95&w=122&h=122' alt='img'/>
//           </a> */}
//         </div>
//       </div>

// </div>
//     </div>
//   )
// } 

// export default Header

import React from 'react'
import './header.css'
import { useHistory } from "react-router-dom";


const Header = () => {
  let history = useHistory();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push('./login'); 
    window.location.reload();
  }
  return (
    <div>
      <div className='Hbody'>
        <div className='Hleftfold'>
          <label className="Hlabel" style={{marginLeft:'100px',fontSize:'35px'}}>RAHBER</label>
          {/* <div className='Hprofile'>
          <div className='Hoptions'>
          <button class="btn btn-outline-dark btn btn-light" onClick={handleLogout}>logout</button> */}
        </div>
        {/* <div className='Hrightfold'>
          <div className='HSearch'>
          <i class="fa-brands fa-searchengin"></i>
          <input placeholder='Search'></input>
          </div>
        </div> */}
        <div className='Hprofile'>
          <div className='Hoptions'>
          {/* <i class="fa-solid fa-ellipsis">
          </i> */}
          <button class="btn btn-outline-dark btn btn-light" onClick={handleLogout}>logout</button>
          {/* <a href='login' className='uinfo' onClick={handleLogout}>
          <img className='Havatar'src='https://tse1.mm.bing.net/th?id=OIP.VixIl8SYp8qaYA-o_k_IJgHaHa&pid=Api&rs=1&c=1&qlt=95&w=122&h=122' alt='img'/>
          </a> */}
        </div>
      </div>

</div>
    </div>
  )
} 

export default Header
 