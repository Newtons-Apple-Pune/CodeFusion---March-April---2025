import React from 'react'
const Sidebar = () => {
    return (
         <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Saisha Shah</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Overview</span></a></li>
                <li class="nav-item mb-2">
                    <a class="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Add▾</span></a>
                    <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="true">
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="https://www.lenskart.com/"><i class="fas fa-book-reader"></i> Faculty </a></li>
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="https://botpress.com/"> <i class="fas fa-book-medical"></i> Student </a></li>
                    </ul>
                </li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="https://siesascs.edu.in/"><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Files</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="https://www.youtube.com/"><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3">Calendar</span></a></li>
                </ul>
       </div>
    )
}
export default Sidebar