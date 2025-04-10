import React from "react";
import "./head.css";

const Head = () => {
  return (
    <>
      <section className="ahead">
        <div className="container flexSB">
          <div className="logo" >
            <h1 style={{marginTop:'0'}}>RAHBER</h1>
            <span>Life Is All About Learning</span>
          </div>

          <div className="social">
            {/* Facebook */}
            <a href="https://www.facebook.com/your_facebook_page" target="_blank">
              <i className="fab fa-facebook-f icon"></i>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/kaxnaat?igsh=YTQzaDFsMWZ6anNi" target="_blank">
              <i className="fab fa-instagram icon"></i>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com/your_twitter_page" target="_blank">
              <i className="fab fa-twitter icon"></i>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/your_youtube_channel" target="_blank">
              <i className="fab fa-youtube icon"></i>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/your_linkedin_profile" target="_blank">
              <i className="fab fa-linkedin icon"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;