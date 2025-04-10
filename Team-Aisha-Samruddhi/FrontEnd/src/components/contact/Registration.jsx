import React, { useState } from "react";
import Back from "../common/back/Back";
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const Registration = () => {
  const [credentials, setCredentials] = useState({
    Name: "",
    EmailID: "",
    Class: "",
    Course: "",
    Contact: "",
    Percentage: "",
    Institute: "",
  });
  const [messageSent, setMessageSent] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Name:credentials.Name,
          EmailID:credentials.EmailID,
          Class: credentials.Class,
          Course: credentials.Course,
          Contact: credentials.Contact,
          Percentage: credentials.Percentage,
          Institute: credentials.Institute,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        localStorage.setItem("email", json.email);
        setMessageSent(true);
        setTimeout(() => {
          setMessageSent(false);
          history.push("/register");
        }, 3000);
        setCredentials({
          Name: "",
          EmailID: "",
          Class: "",
          Course: "",
          Contact: "",
          Percentage: "",
          Institute: "",
        });
      } else {
        alert("Error Occurred. Please try again later!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while submitting the form. Please try again later!"
      );
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onDropDownChange = (e) => {
    setCredentials({ ...credentials, class: e.target.value });
  };

  return (
    <>
      <Back title="Registration Form" />
      <MDBContainer className="my-5" style={{ marginTop: "500px" }}>
        <MDBCard style={{ marginTop: "500px" }}>
          <form onSubmit={handleSubmit}>
            <center>
              <h2 style={{ letterSpacing: "1px" }}>Enroll Now</h2>
              <p>
                Enroll For The Free Demo Lectures!!
                <br />
                Limited Seats!!
              </p>
              <br />
              <hr />
            </center>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <div style={{ marginTop: "200px" }}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="img-fluid"
                    alt="Phone image"
                  />
                </div>
              </MDBCol>

              <MDBCol>
                <MDBCardBody className="d-flex flex-column">
                  <p style={{ color: "red" }}>
                    SELECTION OF STUDENTS WILL BE BASED ON THE AVAILABILITY OF
                    SEATS
                  </p>
                  <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Name"
                      placeholder="NAME"
                      id="formControlLg"
                      value={credentials.Name}
                      onChange={onChange}
                      type="text"
                      name="Name"
                      size="lg"
                      required
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email address"
                      placeholder="EMAIL ID"
                      id="formControlLg"
                      value={credentials.EmailID}
                      onChange={onChange}
                      name="EmailID"
                      type="email"
                      size="lg"
                      required
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Class"
                      placeholder="Your Qualification"
                      id="formControlLg"
                      value={credentials.Class}
                      onChange={onChange}
                      name="Class"
                      type="text"
                      size="lg"
                      required
                    />
                    {/* <div className="mb-4">
                      <label htmlFor="classSelect" className="form-label">
                        Class
                      </label>
                      <select
                        className="form-select"
                        id="classSelect"
                        value={credentials.class}
                        onChange={onDropDownChange}
                        required
                      >
                        <option value="">Select a class</option>
                        <option value="class1">8th</option>
                        <option value="class2">9th</option>
                        <option value="class3">10th</option>
                        <option value="class3">11th SCIENCE</option>
                        <option value="class3">11th COMMERCE</option>
                      </select>
                    </div> */}
                    <MDBInput
                      label="Course"
                      id="formControlLg"
                      placeholder="Course Wanna Enroll For"
                      value={credentials.Course}
                      onChange={onChange}
                      name="Course"
                      type="text"
                      size="lg"
                      required
                    />
                    <MDBInput
                      label="Contact Number"
                      id="formControlLg"
                      placeholder="Contact Number"
                      value={credentials.Contact}
                      onChange={onChange}
                      name="Contact"
                      type="text"
                      size="lg"
                      required
                    />
                    <MDBInput
                      label="Percentage"
                      id="formControlLg"
                      placeholder="Last Exam Percentage Or CGPA"
                      value={credentials.Percentage}
                      onChange={onChange}
                      name="Percentage"
                      type="text"
                      size="lg"
                      required
                    />
                    <MDBInput
                      label="Institute"
                      id="formControlLg"
                      placeholder="Your Institute Name"
                      value={credentials.Institute}
                      onChange={onChange}
                      name="Institute"
                      type="text"
                      size="lg"
                      required
                    />
                  </div>
                  <button className="btn btn-dark btn-lg" type="submit">
                    Submit
                  </button>

                  {messageSent && (
                    <p
                      style={{
                        color: "green",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Message Sent Successfully
                    </p>
                  )}
                  <p style={{ color: "#393f81", marginLeft: "100px" }}>
                    Have Questions?{" "}
                    <a href="/contact" style={{ color: "#393f81" }}>
                      Click here
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Registration;
