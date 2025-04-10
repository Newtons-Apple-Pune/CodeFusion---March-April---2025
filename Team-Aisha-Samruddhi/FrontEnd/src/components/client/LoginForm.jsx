import React, { useState, useEffect } from 'react';
import './LOGINM.css';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ LoginID: '', Password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    let history = useHistory();

    useEffect(() => {
        console.log('Error message:', errorMessage);
    }, [errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LoginID: credentials.LoginID,
                Password: credentials.Password,
            }),
        });

        const json = await response.json();
        console.log(json);
        console.log('User Data:', json.user);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            console.log('Saved Token:', localStorage.getItem('token'));

            if (json.user && json.user.LoginID === 'Saisha') {
                history.push('./dashboard');
                setTimeout(() => {
                    window.location.reload();
                }, 0.5);
            } else {
                const userType = json.user.userType;
                switch (userType) {
                    case 'student':
                        history.push('/calls');
                        break;
                    case 'teacher':
                        history.push('/calls');
                        break;
                    default:
                        console.error('Unknown user type:', userType);
                        // Handle unknown user type, maybe redirect to a default page
                        break;
                }
                setTimeout(() => {
                    window.location.reload();
                }, 0.5);
            }
        } else {
          setErrorMessage(json.error || 'Invalid Credentials');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="back"></div>
            <div className="wrapper">
                <div className="inner">
                    <img src="./images/image-1.png" alt="" className="image-1"/>
                    <form action="" onSubmit={handleSubmit}>
                        <h3>LOGIN</h3>
                        <div className="form-holder">
                            <span className="lnr lnr-user"></span>
                            <input type="text" className="form-control" name='LoginID' placeholder="LOGIN ID"  value={credentials.LoginID} onChange={onChange}/>
                        </div>
                        <div className="form-holder">
                            <span className="lnr lnr-phone-handset"></span>
                            <input type="password" className="form-control" name='Password' placeholder="PASSWORD" value={credentials.Password} onChange={onChange}/>
                            {/* {errorMessage && <p className="error-message" style={{color:'red'}}>{errorMessage}</p>} */}
                        </div>
                        {errorMessage && <p className="error-message" style={{color:'red'}}>{errorMessage}</p>}
                        <button type="submit" className="btn btn-outline-success">LOGIN</button>
                        
                    </form>
                    <img src="./images/image-2.png" alt="" className="image-2"/>
                    
                </div>
            </div>
            <script src="js/jquery-3.3.1.min.js"></script>
            <script src="js/main.js"></script>
        </div>
    );
}

export default LoginForm;
