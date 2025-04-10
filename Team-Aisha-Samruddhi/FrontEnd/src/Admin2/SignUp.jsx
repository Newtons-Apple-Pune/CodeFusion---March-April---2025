import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
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
import image from "./Muslim-girl-student.jpg";

const SignUp = () => {
  document.body.style.backgroundColor = "#130f40";
  const [messageSent, setMessageSent] = useState(false);
  const [credentials, setCredentials] = useState({
    Name: "",
    Gender: "",
    Class: "",
    EmailID: "",
    DOB: "",
    Address: "",
    Contact: "",
    FName: "",
    MName: "",
    FContact: "",
    MContact: "",
    LoginID: "",
    Password: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const {Name,Gender,Class,EmailID,DOB,Address,Contact,FName,MName,FContact,MContact,LoginID,Password} = credentials;
    const response = await fetch(
      "http://localhost:5000/api/auth/createstudent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: credentials.Name,
          Gender: credentials.Gender,
          Class: credentials.Class,
          EmailID: credentials.EmailID,
          DOB: credentials.DOB,
          Address: credentials.Address,
          Contact: credentials.Contact,
          FName: credentials.FName,
          MName: credentials.MName,
          FContact: credentials.FContact,
          MContact: credentials.MContact,
          LoginID: credentials.LoginID,
          Password: credentials.Password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        history.push("./signup");
      }, 5000);
      setCredentials({
        Name: "",
        Gender: "",
        Class: "",
        EmailID: "",
        DOB: "",
        Address: "",
        Contact: "",
        FName: "",
        MName: "",
        FContact: "",
        MContact: "",
        LoginID: "",
        Password: "",
      });
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <MDBContainer style={{ marginTop: "100px" }}>
        <MDBCard className="my-5 rounded-3" style={{ borderRadius: "50px" }}>
          <MDBCardImage
            src={image}
            style={{ borderRadius: "8px", height: "350px" }}
          />
          <form onSubmit={handleSubmit} style={{ borderRadius: "8px" }}>
            <MDBRow className="mb-4">
              <MDBCol md="12" className="text-center">
                <p className="h1 fw-bold">Add Student</p>
              </MDBCol>
            </MDBRow>
            <MDBCardBody className="mx-5 mb-5 p-5 text-black">
              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                    label="Name"
                      type="text"
                      name="Name"
                      className="form-control"
                      value={credentials.Name}
                      onChange={onChange}
                      id="validationDefault01"
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="mars-and-venus me-3" size="lg" />
                    <MDBInput
                    label="Gender"
                      type="text"
                      className="form-control"
                      name="Gender"
                      value={credentials.Gender}
                      id="validationDefault01"
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="graduation-cap me-3" size="lg" />
                    <MDBInput
                    label="Class"
                      type="text"
                      name="Class"
                      className="form-control"
                      id="validationDefault02"
                      value={credentials.Class}
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                    label="EmailID"
                      type="email"
                      className="form-control"
                      name="EmailID"
                      id="validationDefaultUsername"
                      value={credentials.EmailID}
                      onChange={onChange}
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon=" fa-calendar-days me-3" size="lg" />
                    <MDBInput
                    label="Date Of Birth"
                      type="Date"
                      name="DOB"
                      className="form-control"
                      value={credentials.DOB}
                      id="validationDefault03"
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="map-location-dot me-3" size="lg" />
                <MDBInput
                    label="Address"
                      type="text"
                      className="form-control"
                      name="Address"
                      id="validationDefault04"
                      value={credentials.Address}
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="mobile-screen-button me-3" size="lg" />
                    <MDBInput
                    label="Student's Contact"
                      type="text"
                      name="Contact"
                      className="form-control"
                      id="validationDefault05"
                      value={credentials.Contact}
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="fas fa-person me-3" size="lg" />
                    <MDBInput
                    label="Father Name"
                      type="text"
                      name="FName"
                      className="form-control"
                      id="validationDefault06"
                      value={credentials.FName}
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="fas fa-person-dress me-3" size="lg" />
                    <MDBInput
                    label="Mother Name"
                      type="text"
                      name="MName"
                      className="form-control"
                      value={credentials.MName}
                      id="validationDefault07"
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="fas fa-id-badge me-3" size="lg" />
                    <MDBInput
                    label='Father Contact No.'
                      type="text"
                      name="FContact"
                      className="form-control"
                      id="validationDefault08"
                      value={credentials.FContact}
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="fas fa-phone-flip me-3" size="lg" />
                    <MDBInput
                    label="Mother Contact No."
                      type="text"
                      name="MContact"
                      className="form-control"
                      value={credentials.MContact}
                      id="validationDefault09"
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="arrow-right-to-bracket me-3" size="lg" />
                    <MDBInput
                    label="LoginID"
                      type="text"
                      name="LoginID"
                      className="form-control"
                      value={credentials.LoginID}
                      id="validationDefault10"
                      onChange={onChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />

                    <MDBInput
                    label="Password"
                      type="password"
                      name="Password"
                      className="form-control"
                      value={credentials.Password}
                      onChange={onChange}
                      id="validationDefault11"
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              {messageSent && (
                <p
                  style={{
                    color: "green",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  Data Added Successfully
                </p>
              )}

              <MDBBtn
                className="w-100"
                type="submit"
                size="lg"
                style={{ backgroundColor: "#130f40", height: "50px" }}
              >
                Welcome New Student
              </MDBBtn>
            </MDBCardBody>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SignUp;
