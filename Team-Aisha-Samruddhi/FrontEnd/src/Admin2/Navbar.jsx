import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("");
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("./login");
    window.location.reload();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Handle the selected option as needed
    switch (option) {
      case "Option 1":
        history.push("./registerdata");
        break;
      case "Option 2":
        // Handle Option 2
        break;
      // Add more cases as needed
      default:
        break;
    }
    window.location.reload();
  };

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
      <div className="flex-row d-flex">
        <button
          type="button"
          className="navbar-toggler mr-2 "
          data-toggle="offcanvas"
          title="Toggle responsive left sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a
          className="navbar-brand"
          href="#"
          title="Free Bootstrap 4 Admin Template"
          style={{ marginLeft: "20px" }}
        >
          RAHBER
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" onClick={handleOptionSelect}>
            <button
              className="nav-link"
              onClick={() => history.push("/dashboard")}
            >
              Home <span className="sr-only">Home</span>
            </button>
          </li>
          {/* <li className="nav-item" onClick={handleOptionSelect}>
            <button
              className="nav-link"
              onClick={() => history.push("/signup")}
            >
              Add Students
            </button>
          </li>
          <li className="nav-item" onClick={handleOptionSelect}>
            <button className="nav-link" onClick={() => history.push("/addteacher")}>
              Add Teachers
            </button>
          </li> */}
          <li className="nav-item" onClick={handleOptionSelect}>
            <button className="nav-link" onClick={() => history.push("/file")}>
              Files
            </button>
          </li>
          <li className="nav-item" onClick={handleOptionSelect}>
            <button
              className="nav-link"
              onClick={() => history.push("/calendarA")}
            >
              Calendar
            </button>
          </li>
          <li className="nav-item" onClick={handleOptionSelect}>
            <button
              className="nav-link"
              onClick={() => history.push("/MeetingA")}
            >
              Meeting
            </button>
          </li>
          {/* <li className="nav-item" onClick={handleOptionSelect}>
            <button
              className="nav-link"
              onClick={() => history.push("/chat")}
            >
              Chat
            </button>
          </li> */}
          <NavDropdown
            className="nav-link"
            title="ADD DATA"
            id="basic-nav-dropdown"
            style={{ marginTop: "19px", fontSize: "15px" }}
          >
            <NavDropdown.Item href="./signup">
              Add New Student
            </NavDropdown.Item>
            <NavDropdown.Item href="addteacher">
              Add New Teacher
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="nav-link"
            title="FETCH DATA"
            id="basic-nav-dropdown"
            style={{ marginTop: "19px", fontSize: "15px" }}
          >
            <NavDropdown.Item href="./registerdata">
              Registration Entries
            </NavDropdown.Item>
            <NavDropdown.Item href="contactusdata">
              Contact Us Data
            </NavDropdown.Item>
            <NavDropdown.Item href="/studentdata">
              Students Data
            </NavDropdown.Item>
            <NavDropdown.Item href="/teacherdata">
              Teachers Data
            </NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
          </NavDropdown>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              className="btn btn-outline-danger my-2 my-sm-0"
              type="button"
              onClick={handleLogout}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
