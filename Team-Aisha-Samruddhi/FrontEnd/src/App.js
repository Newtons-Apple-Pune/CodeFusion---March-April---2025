import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/common/heading/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Team from './components/team/Team';
import Contact from './components/contact/Contact';
import LoginMain from './components/client/LoginMain';
import SignUp from './Admin2/SignUp';
// import FileList from './components/FilesList';
import NotesHome from './components/NotesHome';
import AppRouter from './router/AppRouter';
import Meeting from './ALcomponents/Pages/Meeting';
import index from './ALcomponents/Pages';
import RoomPage from './ALcomponents/Pages/room/RoomPage';
import HostPG from './ALcomponents/Pages/room/HostPG';
import Registration from './components/contact/Registration';
import Dashboard from './Admin2/Dashboard';
import Files from './ALcomponents/Pages/Files';
import RegisterData from './Admin2/RegisterData';
import ContactUsData from './Admin2/ContactUsData';
import StudentData from './Admin2/StudentData';
import CalendarMain from './ALcomponents/Pages/CalendarMain';
import CalendarA from './ALcomponents/Pages/CalendarA';
import AddTeacher from './Admin2/AddTeacher';
import MeetingA from './Admin2/MeetingA';
import RoomA from './Admin2/RoomA';
import RoomPageA from './Admin2/RoomPageA';
import ChatFinal from './ALcomponents/ChatFinal';
import CalendarF from './ALcomponents/CalendarF';
import TeacherData from './Admin2/TeacherData';



function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // User is authenticated
            setUser(token);
        } else {
            // User is not authenticated
            setUser(null);
        }
    }, []);

    return (
        <>
            <Router>
                {user ? (
                    <>
                    
                        <Switch>
                            <Route path='/calls' exact component={Meeting} />
                            <Route path='/signup' exact component={SignUp} />
                            <Route path='/Activity' exact component={NotesHome} />
                            <Route path='/calendar' exact component={CalendarA} />
                            {/* <Route path='/calendar' exact component={CalendarF} /> */}
                             {/* <Route path='/chat' exact component={project} />  */}
                             <Route path='/chat' exact component={ChatFinal} />
                            <Route path='/dashboard' exact component={Dashboard} />
                            <Route path='/files' exact component={AppRouter} />
                            <Route path='/MeetingA' exact component={MeetingA} />
                            <Route path='/roomA' exact component={RoomA} />
                            <Route path='/roomA/:roomId' exact component={RoomPageA} />
                            <Route path='/room' exact component={index} />
                            <Route path='/room/:roomId' exact component={RoomPage} />
                            <Route path='/join' exact component={HostPG} />
                            <Route path='/file' exact component={Files} />
                            <Route path='/registerdata' exact component={RegisterData} />
                            <Route path='/contactusdata' exact component={ContactUsData} />
                            <Route path='/studentdata' exact component={StudentData} />
                            <Route path='/teacherdata' exact component={TeacherData} />
                            <Route path='/calendarA' exact component={CalendarMain} />
                            <Route path='/addteacher' exact component={AddTeacher} />
                        </Switch>
                    </>
                ) : (
                    <>
                        <Header/>
                        <Switch >
                            <Route path='/' exact component={Home} />
                            <Route path='/about' exact component={About} />
                            <Route path='/allcourses' exact component={CourseHome} />
                            <Route path='/teachers' exact component={Team} />
                            <Route path='/contact' exact component={Contact} />
                            <Route path='/login' exact component={LoginMain} />
                            <Route path='/register' exact component={Registration} /> 
                        </Switch>
                    </>
                )}
            </Router>
        </>
    );
}

export default App
