import React from "react";
import "./hero.css";
import { useHistory } from "react-router-dom";

const Hero = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("./allcourses");
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <p>
              Education is not preparation for life;
              <br /> EDUCATION IS LIFE ITSELF.
            </p>
            <br />
            <p>
              Unlock Your Potential!
              <br />
              Join our dynamic classes and embark on a transformative learning
              journey. <br />
              Discover new horizons, acquire valuable skills, and nurture your
              passion.
              <br />
              <br />
            </p>
            <div className="enroll">
              <p> Enroll today and pave the way for a brighter future!!!!</p>
            </div>
            {/* <div className="button">
              <button
                class="primary-btn"
                onClick={handleClick}
                title="View Courses"
              >
                GET STARTED NOW, VIEW OUR COURSES
                <ul>
                  <i className="fa fa-long-arrow-alt-right"></i>
                </ul>
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
