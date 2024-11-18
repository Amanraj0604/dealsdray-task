import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const leftContent = document.querySelector('.left-content');
    const rightSlider = document.querySelector('.right-slider');

    const options = {
      threshold: 0.2, 
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    const marqueeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('marquee-visible');
        }
      });
    }, options);

    observer.observe(leftContent);
    marqueeObserver.observe(rightSlider);
  }, []);

  return (
    <>
      <div className="home-sec">
        <div className="left-content">
          <h1>
            Welcome to <span>Admin Panel</span>
          </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <Link to={"/employeeList"}><button>Get Started</button></Link>
        </div>

              <div className="right-slider">
                  <div className="slide-sec">
                      <marquee behavior="alternate" direction="up">
                          <img src="https://i.pinimg.com/control/236x/49/af/31/49af31ab047214f5fd69df448640a710.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/7d/a7/45/7da745d2e03de019a639d4750e9dd5b0.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/03/38/96/033896c2fcebaf29bb7206675d76b4c7.jpg" alt="" />
                      </marquee>
                      <marquee behavior="alternate" direction="down">
                          <img src="https://i.pinimg.com/control/236x/49/af/31/49af31ab047214f5fd69df448640a710.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/7d/a7/45/7da745d2e03de019a639d4750e9dd5b0.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/03/38/96/033896c2fcebaf29bb7206675d76b4c7.jpg" alt="" />
                      </marquee>
                      <marquee behavior="alternate" direction="up">
                          <img src="https://i.pinimg.com/control/236x/49/af/31/49af31ab047214f5fd69df448640a710.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/7d/a7/45/7da745d2e03de019a639d4750e9dd5b0.jpg" alt="" />
                          <img src="https://i.pinimg.com/control/236x/03/38/96/033896c2fcebaf29bb7206675d76b4c7.jpg" alt="" />
                      </marquee>
                  </div>
              </div>
      </div>
    </>
  );
};

export default Home;
