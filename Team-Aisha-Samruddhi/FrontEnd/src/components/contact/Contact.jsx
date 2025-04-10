import React,{useState} from "react";
import Back from "../common/back/Back";
import { useHistory } from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const Contact = () => {
  const [credentials, setCredentials] = useState({ Name:"",EmailID:"",Message: "" });
  const [messageSent, setMessageSent] = useState(false);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const {Name,EmailID,Message} = credentials;
    try{
    const response = await fetch("http://localhost:5000/api/auth/contact", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name:credentials.Name,EmailID:credentials.EmailID,
        Message: credentials.Message })
    });
    const json = await response.json()
    console.log(json);
    if (response.ok){
      localStorage.setItem('email', json.email);
        setMessageSent(true);
        setTimeout(() => {
          setMessageSent(false);
          history.push("/contact");
        }, 5000);
         // Clear form fields after successful submission
      setCredentials({ Name: "", EmailID: "", Message: "" });
      } else {
        alert("Error Occurred. Please try again later!");
      }
  }
  catch(error){
     console.error("Error:", error);
      alert("An error occurred while submitting the form. Please try again later!");
  }
}
const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
}
  return (
    <>
      <Back title="CONTACT US" />
      <MDBContainer
        className="my-5"
        style={{ marginTop: "500px", width: "1500px" }}
      >
        <MDBCard style={{ marginTop: "500px" }}>
          <form onSubmit={handleSubmit}>
          <center>
            <h2 style={{ letterSpacing: "1px" }}>Contact Us</h2>
            <p>We're open for any suggestion or just to have a chat</p>
            <hr />
          </center>
          <MDBRow
            className="g-0"
            style={{
              marginLeft: "5px",
              marginBottom: "5px",
              marginRight: "5px",
              borderRadius: "2px",
              border: "2px solid black",
            }}
          >
            <MDBCol md="6" style={{ marginLeft: "10px" }}>
              <div style={{ marginTop: "30px" }}>
                <iframe
                  width="100%"
                  height="600"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=rahber%20classes,180/A,%20Abdul%20Khalique%20Abdul%20Rahman%20Flat,%20Pipe%20Line%20Rd,%20Kurla%20West+(RAHBER)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/population/">
                    Population mapping
                  </a>
                </iframe>
              </div>
            </MDBCol>

            <MDBCol>
              <MDBCardBody className="d-flex flex-column">
                <h5 style={{ color: "red" }}>ADDRESS:</h5>
                <p>
                  180/A, Abdul Khalique Abdul Rahman Flats, 2nd Floor, Opposite
                  Ekta Bakery, Pipe Line Rd, Kurla West, Mumbai, Maharashtra
                  400070
                </p>
                <br />
                <h5 style={{ color: "red" }}>EMAIL:</h5>
                <p>rahberinfo@gmail.com</p>
                <br />
                <h5 style={{ color: "red" }}>PHONE:</h5>
                <p>8357228515</p>
                <br />
                <div style={{ marginLeft: "10px" }}>
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
                    label="Message"
                    id="formControlLg"
                    placeholder="YOUR MESSAGE"
                    value={credentials.Message}
                    onChange={onChange}
                    name="Message"
                    type="text"
                    size="lg"
                    required
                  />
                </div>
                {/* <MDBBtn color="dark" size="lg">
                  Submit
                </MDBBtn> */}
                <button style={{ border: '1px black', borderRadius: '5px' }}>Submit</button>

                 {/* Success message */}
                 {messageSent && (
                  <p style={{ color: "green", marginLeft: "10px", marginTop: "10px" }}>
                    Message Sent Successfully
                  </p>
                )}
                <p style={{ color: "#393f81", marginLeft: "100px" }}>
                  Wanna Enroll?{" "}
                  <a href="/register" style={{ color: "#393f81" }}>
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

export default Contact;
