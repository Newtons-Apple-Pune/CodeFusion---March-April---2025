import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React,{useState} from "react";
import Navbar from "./Navbar";
import { useHistory } from 'react-router-dom'
import image from "./female-hijab-muslim-teacher-helps-school-children-finish-lesson-classroom_606562-293.avif"

const AddTeacher = () => {
  document.body.style.backgroundColor = "#130f40";
  const [messageSent, setMessageSent] = useState(false);
  // const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({ Name:"",Gender:"",Education:"",EmailID:"",JoinDate:"",Address:"",Contact:"",AlternateContact:"",LoginID:"",Password:""});
  let history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    //const {Name,Gender,Class,EmailID,DOB,Address,Contact,FName,MName,FContact,MContact,LoginID,Password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createteacher", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name:credentials.Name,Gender:credentials.Gender,
        Education:credentials.Education,EmailID:credentials.EmailID,
        JoinDate:credentials.JoinDate,Address:credentials.Address,Contact:credentials.Contact,
        AlternateContact:credentials.AlternateContact,
        LoginID: credentials.LoginID, Password: credentials.Password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        history.push('./addteacher');
      }, 5000);
      setCredentials({ Name:"",Gender:"",Education:"",EmailID:"",JoinDate:"",Address:"",Contact:"",AlternateContact:"",LoginID:"",Password:""});
  }
  else{
    alert("Invalid credentials");
  }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target.name]: "" });
 }
  return (
    <>
      <Navbar />
      <MDBContainer style={{ marginTop: "100px" }}>
          <MDBCard className='my-5 rounded-3' style={{borderRadius: "50px"}}>
          <MDBCardImage src={image} style={{borderRadius: "8px",height:'350px'}}/>
          <form onSubmit={handleSubmit} style={{borderRadius: "8px"}}>
          <MDBRow className="mb-4">
            <MDBCol md="12" className="text-center">
              <p className="h1 fw-bold">Add Teacher</p>
            </MDBCol>
          </MDBRow>
          <MDBCardBody className="mx-5 mb-5 p-5 text-black">

          <MDBRow>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label="Name"
                  id="form1"
                  type="text"
                  className="w-100 form-control"
                  name="Name"
            value={credentials.Name}
            onChange={onChange}
                />
                {/* {errors.Name && <div className="text-danger">{errors.Name}</div>} */}
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="mars-and-venus me-3" size="lg" />
                <MDBInput
                  label="Gender"
                  id="form1 validationDefault01"
                  type="text"
                  name="Gender"
                  className="w-100 form-control"
                  value={credentials.Gender}
                  onChange={onChange}
                />
                {/* {errors.Gender && <div className="text-danger">{errors.Gender}</div>} */}
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="graduation-cap me-3" size="lg" />
                <MDBInput
                  label="Qualification"
                  id="form1"
                  type="text"
                  name="Education"
                  className="w-100 form-control"
                  value={credentials.Education}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="EmailID"
                  id="form1"
                  type="email"
                  name="EmailID"
                  className="w-100 form-control"
                  value={credentials.EmailID}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="briefcase me-3" size="lg" />
                <MDBInput
                  label="Join Date"
                  id="form1"
                  type="date"
                  name="JoinDate"
                  className="w-100 form-control"
                  value={credentials.JoinDate}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="map-location-dot me-3" size="lg" />
                <MDBInput
                  label="Address"
                  id="form1"
                  type="text"
                  name="Address"
                  className="w-100 form-control"
                  value={credentials.Address}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="mobile-screen-button me-3" size="lg" />
                <MDBInput
                  label="Contact"
                  id="form1"
                  type="number"
                  name="Contact"
                  className="w-100 form-control"
                  value={credentials.Contact}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="phone-flip me-3" size="lg" />
                <MDBInput
                  label="Alternate Contact"
                  id="form1"
                  type="number"
                  name="AlternateContact"
                  className="w-100 form-control"
                  value={credentials.AlternateContact}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="arrow-right-to-bracket me-3" size="lg" />
                <MDBInput
                  label="LoginID"
                  id="form1"
                  type="text"
                  name="LoginID"
                  className="w-100 form-control"
                  value={credentials.LoginID}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form1"
                  type="password"
                  name="Password"
                  className="w-100 form-control"
                  value={credentials.Password}
                  onChange={onChange}
                />
              </div>
            </MDBCol>
          </MDBRow>
          {messageSent && (
                  <p style={{ color: "green", marginLeft: "10px", marginTop: "10px" }}>
                   Data Added Successfully
                  </p>
                )}
                 
          <MDBBtn className='w-100' type="submit" size='lg' style={{backgroundColor:'#130f40',height:'50px'}}>Welcome New Teacher</MDBBtn>
          </MDBCardBody>
          </form>
          </MDBCard>
          
      </MDBContainer>
    </>
  );
};

export default AddTeacher;
